import React, { useEffect, useState } from "react";

interface IGenre {
    id: number;
    description: string;
    name: string;
};

interface IAuthor {
    id: number;
    name: string;
    birthday: Date;
};

const CreateNewBook = () => {
    const [genres, setGenres] = useState<IGenre[]>([]);
    const [authors, setAuthors] = useState<IAuthor[]>([]);

    const [title, setTitle] = useState<string>("");
    const [genreId, setGenreId] = useState<number>(1);
    const [authorId, setAuthorId] = useState<number>(1);

    const API_URL = "http://127.0.0.1:8000/api";

    useEffect(() => {
        const main = async () => {
            const [genresData, authorsData] = await Promise.all([
                await fetch(`${API_URL}/genres`).then(resp => resp.json()),
                await fetch(`${API_URL}/authors`).then(resp => resp.json())
            ]);

            setGenres(genresData);
            setAuthors(authorsData);

            return { genresData, authorsData };
        };

        main();
    }, []);

    const onNewBook = async () => {
        try {
            const resp = await fetch(`${API_URL}/create_book`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    genre_id: genreId,
                    author_id: authorId
                })
            });

            if (!resp.status) {
                throw new Error(`HTTP error, status: ${resp.status}`);
            }

            const data = await resp.json();

            return data;
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col gap-2">
                <label>Title</label>
                <input type="text" className="border-solid border-2 border-slate-400 outline-none" onChange={(ev) => setTitle(ev.target.value)} />
                <select className="px-2 py-2">
                    {genres.map((item, idx) => (
                        <option key={idx} onClick={() => setGenreId(idx)}>{item.name}</option>
                    ))}
                </select>
                <select className="px-2 py-2">
                    {authors.map((item, idx) => (
                        <option key={idx} onClick={() => setAuthorId(idx)}>{item.name}</option>
                    ))}
                </select>
                <button className="text-white bg-zinc-500 px-2 py-2 w-32 rounded-md hover:bg-zinc-800" onClick={() => onNewBook()}>Create book</button>
            </div>
        </div>
    )
};

export default CreateNewBook;
