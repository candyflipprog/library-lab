import React, { useState } from "react";

const CreateNewGenre = () => {
    const [description, setDescription] = useState<string>("");
    const [name, setName] = useState<string>("");

    const API_URL = "http://127.0.0.1:8000/api/create_genre";

    const onNewGenre = async () => {
        try {
            const resp = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    description: description,
                    name: name
                })
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
                <label htmlFor="description">Description</label>
                <input type="text" className="border-solid border-2 border-slate-400 outline-none" onChange={(ev) => setDescription(ev.target.value)} />

                <label htmlFor="name">Name</label>
                <input type="text" className="border-solid border-2 border-slate-400 outline-none" onChange={(ev) => setName(ev.target.value)} />

                <button className="text-white bg-zinc-500 px-2 py-2 w-32 rounded-md hover:bg-zinc-800" onClick={() => onNewGenre()}>Create book</button>
            </div>
        </div>
    )
};

export default CreateNewGenre;
