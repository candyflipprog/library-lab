import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import getBooks from "../requests/getBooks.js";
import getGenres from "../requests/getGenres.js";
import getAuthors from "../requests/getAuthors.js";
import createBook from "../requests/createBook.js";
import createAuthor from "../requests/createAuthor.js";
import createGenre from "../requests/createGenre.js";
import getReaders from "../requests/getReaders.js";
import abonementBook from "../requests/abonementBook.js";
import getAbonementBooks from "../requests/getAbonementBooks.js";
import passTheBook from "../requests/passTheBook.js";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api/books", getBooks);
app.get("/api/genres", getGenres);
app.get("/api/authors", getAuthors);
app.get("/api/readers", getReaders);
app.get("/api/abonement_books", getAbonementBooks);

app.post("/api/create_author", createAuthor);
app.post("/api/create_book", createBook);
app.post("/api/create_genre", createGenre);
app.post("/api/abonement_book", abonementBook);

app.patch("/api/pass_the_book", passTheBook);

const port = 8000;
app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server listening on port ${port}`);
});
