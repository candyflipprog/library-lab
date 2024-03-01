import React, { useState, useEffect } from "react";

interface IGenre {
    genre_id: number;
    description: string;
    name: string;
};

const Genres = () => {
    const [genres, setGenres] = useState<IGenre[]>([]);

    const API_URL = "http://127.0.0.1:8000/api/genres";

    useEffect(() => {
        const fetchBooks = async () => {
            const resp = await fetch(API_URL).then(resp => resp.json()).then(data => {
                setGenres(data);
            });

            return resp;
        };

        fetchBooks();
    }, []);

    return (
        <div className="flex items-center justify-center">
            <div>
                <span className="text-4xl text-slate-400">Assortiment genres</span>
                {genres.map((item, idx) => (
                    <ul key={idx} className="flex gap-2">
                        <span>{item.genre_id})</span>
                        <li>
                            {item.name}
                            <br />
                            {item.description}
                        </li>
                    </ul>
                ))}
            </div>
        </div>
    )
};

export default Genres;
