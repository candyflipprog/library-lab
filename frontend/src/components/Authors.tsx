import React, { useState, useEffect } from "react";

interface IAuthor {
    author_id: number;
    name: string;
    birthday: Date;
};

const Authors = () => {
    const [authors, setAuthors] = useState<IAuthor[]>([]);

    const API_URL = "http://127.0.0.1:8000/api/authors";

    useEffect(() => {
        const fetchBooks = async () => {
            const resp = await fetch(API_URL).then(resp => resp.json()).then(data => {
                setAuthors(data);
            });

            return resp;
        };

        fetchBooks();
    }, []);

        return (
        <div className="flex items-center justify-center">
            <div>
                <span className="text-4xl text-slate-400">Assortiment books</span>
                {authors.map((item, idx) => (
                    <ul key={idx} className="flex">
                        <span>{item.author_id})</span>
                        <li>
                            {item.name}
                        </li>
                    </ul>
                ))}
            </div>
        </div>
    )
};

export default Authors;
