import React, { useEffect, useState } from "react";

interface IBook {
  book_id: number;
  title: string;
  genre_id: number;
  author_id: number;
}

interface IReader {
  reader_id: number;
  full_name: string;
  passport_seria: string;
  passport_number: string;
  passport_date: Date;
  phone: string;
}

const AbonementBook = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [readers, setReaders] = useState<IReader[]>([]);
  const [dateOut, setDateOut] = useState(new Date());

  const [bookId, setBookId] = useState<number>(1);
  const [readerId, setReaderId] = useState<number>(1);

  const API_URL = "http://127.0.0.1:8000/api";

  useEffect(() => {
    const main = async () => {
      const respBooks = await fetch(`${API_URL}/books`)
        .then((resp) => resp.json())
        .then((data) => {
          setBooks(data);
        });

      const respReaders = await fetch(`${API_URL}/readers`)
        .then((resp) => resp.json())
        .then((data) => {
          setReaders(data);
        });

      return { respBooks, respReaders };
    };

    main();
  }, []);

  const onAbonementBook = async () => {
    try {
      const resp = await fetch(`${API_URL}/abonement_book`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          book_id: bookId,
          reader_id: readerId,
          date_out: dateOut,
          date_in: null,
        }),
      });

      const data = await resp.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-2">
        <label htmlFor="book">Book</label>
        <select className="px-2 py-2">
          {books.map((item, idx) => (
            <option key={idx} onClick={() => setBookId(item.book_id)}>
              {item.title}
            </option>
          ))}
        </select>

        <label htmlFor="reader">Reader</label>
        <select className="px-2 py-2">
          {readers.map((item, idx) => (
            <option key={idx} onClick={() => setReaderId(item.reader_id)}>
              {item.full_name}
            </option>
          ))}
        </select>

        <label>Date out</label>
        <input
          type="date"
          className="border-solid border-2 border-slate-400 outline-none"
          onChange={(ev) => setDateOut(new Date(ev.target.value))}
        />
        <button
          className="text-white bg-zinc-500 px-2 py-2 w-32 rounded-md hover:bg-zinc-800"
          onClick={() => onAbonementBook()}
        >
          Abonement
        </button>
      </div>
    </div>
  );
};

export default AbonementBook;
