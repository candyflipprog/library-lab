import React, { useState, useEffect } from "react";
import Button from "./Button";

interface IAbonementBook {
    book_id: number;
    reader_id: number;
    date_out: string;
    date_in: Date | null;
}

interface IReader {
    reader_id: number;
    full_name: string;
    passport_seria: string;
    passport_number: string;
    passport_date: Date;
    phone: string;
}

interface IBook {
    book_id: number;
    title: string;
    genre_id: number;
    author_id: number;
    date_out?: string | undefined;
    date_in?: string | null;
}

const MyAbonementBooks = () => {
    const [abonementBooks, setAbonementBooks] = useState<IAbonementBook[]>([]);
    const [readers, setReaders] = useState<IReader[]>([]);
    const [books, setBooks] = useState<IBook[]>([]);
    const [selectedBooks, setSelectedBooks] = useState<IBook[]>([]);

    const [readerId, setReaderId] = useState<number | null>(1);
    const [bookId, setBookId] = useState<number | null>(1);

    const [dateIn, setDateIn] = useState(new Date());

    const API_URL = "http://127.0.0.1:8000/api";

    useEffect(() => {
        const fetchData = async () => {
            const [readersData, abonementBooksData, booksData] = await Promise.all([
                fetch(`${API_URL}/readers`).then((resp) => resp.json()),
                fetch(`${API_URL}/abonement_books`).then((resp) => resp.json()),
                fetch(`${API_URL}/books`).then((resp) => resp.json()),
            ]);

            setReaders(readersData);
            setAbonementBooks(abonementBooksData);
            setBooks(booksData);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (readerId !== null) {
            const selectedBooksData = abonementBooks
                .filter((abonementBook) => abonementBook.reader_id === readerId)
                .map((abonementBook) => {
                    const book = books.find((book) => book.book_id === abonementBook.book_id);
                    return book ? { ...book, date_out: abonementBook.date_out, date_in: abonementBook.date_in } : null;
                })
                .filter((book) => book !== null && book.date_in === null) as IBook[];

            setSelectedBooks(selectedBooksData);
        }
    }, [readerId, abonementBooks, books]);

    let dateOut: string;

    for (const item of selectedBooks) {
        const [date, splitDate] = String(item.date_out).split("T");

        dateOut = date;
    };

    const onPassTheBook = async () => {
        const resp = await fetch(`${API_URL}/pass_the_book`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                reader_id: readerId,
                book_id: bookId,
                date_in: dateIn,
            }),
        });

        const data = await resp.json();

        console.log(data);

        return data;
    };

    return (
        <div className="flex items-center justify-center flex-col">
            <div className="flex flex-col gap-2">
                <label htmlFor="Reader">Reader</label>
                <select onChange={(e) => setReaderId(Number(e.target.value))}>
                    {readers.map((item, idx) => (
                        <option key={idx} value={item.reader_id}>
                            {item.full_name}
                        </option>
                    ))}
                </select>
            </div>

            {readerId !== null && (
                <div className="flex flex-col gap-2">
                    <ul>
                        {selectedBooks.map((book, idx) => (
                            <div key={idx} className="flex flex-col mb-5">
                                <li key={book.book_id} className="flex flex-col gap-1">
                                    <span>{book.title}</span>
                                    <span>{dateOut}</span>
                                    <input
                                        type="date"
                                        className="border-solid border-2 border-slate-400 outline-none"
                                        onChange={(ev) => setDateIn(new Date(ev.target.value))}
                                        placeholder="Date in"
                                    />
                                    <Button
                                        name="Pass the book"
                                        key={book.book_id}
                                        onClick={() => {
                                            setBookId(book.book_id);
                                            setTimeout(() => {
                                                onPassTheBook()
                                            }, 100)
                                        }}
                                    ></Button>
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MyAbonementBooks;
