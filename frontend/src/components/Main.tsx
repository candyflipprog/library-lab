import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const Main = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex gap-2">
                <Button name="Create book" onClick={() => navigate("/create_book")}></Button>
                <Button name="Create author" onClick={() => navigate("/create_author")}></Button>
                <Button name="Create genre" onClick={() => navigate("/create_genre")}></Button>
                <Button name="Abonement book" onClick={() => navigate("/abonement_book")}></Button>
                <Button name="My abonement books" onClick={() => navigate("/my_abonement_books")}></Button>
            </div>
            <div className="flex gap-2">
                <Button name="Authors" onClick={() => navigate("/authors")}></Button>
                <Button name="Books" onClick={() => navigate("/books")}></Button>
                <Button name="Genres" onClick={() => navigate("/genres")}></Button>
            </div>
        </div>
    )
};

export default Main;
