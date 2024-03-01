import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import CreateNewBook from "./components/CreateNewBook";
import CreateNewAuthor from "./components/CreateNewAuthor";
import CreateNewGenre from "./components/CreateNewGenre";
import AbonementBook from "./components/AbonementBook";
import Main from "./components/Main";
import MyAbonementBooks from "./components/MyAbonementBooks";
import Books from "./components/Books";
import Genres from "./components/Genres";
import Authors from "./components/Authors";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/create_book" element={<CreateNewBook />}></Route>
          <Route path="/create_author" element={<CreateNewAuthor />}></Route>
          <Route path="/create_genre" element={<CreateNewGenre />}></Route>
          <Route path="/abonement_book" element={<AbonementBook />}></Route>
          <Route
            path="/my_abonement_books"
            element={<MyAbonementBooks />}
          ></Route>
          <Route path="/books" element={<Books />}></Route>
          <Route path="/genres" element={<Genres />}></Route>
          <Route path="/authors" element={<Authors />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
