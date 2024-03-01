import React, { useState, useEffect } from "react";

interface IBook {
    book_id: number;
    title: string;
    genre_id: number;
    author_id: number;
};

const Books = () => {
    const [books, setBooks] = useState<IBook[]>([]);

    const API_URL = "http://127.0.0.1:8000/api/books";

    useEffect(() => {
        const fetchBooks = async () => {
            const resp = await fetch(API_URL).then(resp => resp.json()).then(data => {
                setBooks(data);
            });

            return resp;
        };

        fetchBooks();
    }, []);
    return (
        <div className="flex items-center justify-center">
            <div>
                <span className="text-4xl text-slate-400">Assortiment books</span>
                {books.map((item, idx) => (
                    <ul key={idx} className="flex">
                        <span>{item.book_id})</span>
                        <li>
                            {item.title}
                        </li>
                    </ul>
                ))}
            </div>
        </div>
    )
};

export default Books;
