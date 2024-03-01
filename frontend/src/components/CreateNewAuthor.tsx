import React, { useState } from "react";

const CreateNewAuthor = () => {
    const [fullName, setFullName] = useState<string>("");
    const [birthday, setBirthday] = useState(new Date());

    const API_URL = "http://127.0.0.1:8000/api/create_author";

    const onNewAuthor = async () => {
        try {
            const resp = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: fullName,
                    birthday: birthday
                })
            });

            if (!resp.ok) {
                throw new Error(`Http error status: ${resp.status}`);
            }

            const data = await resp.json();

            return data;
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col gap-2">
                <label>Full name</label>
                <input type="text" className="border-solid border-2 border-slate-400 outline-none" onChange={(ev) => setFullName(ev.target.value)} />

                <label>Birthday</label>
                <input type="date" className="border-solid border-2 border-slate-400 outline-none" onChange={(ev) => setBirthday(new Date(ev.target.value))} />

                <button className="text-white bg-zinc-500 px-2 py-2 w-32 rounded-md hover:bg-zinc-800" onClick={() => onNewAuthor()}>Create author</button>
            </div>
        </div>
    )
};

export default CreateNewAuthor;
