import connection from "../src/database.js";

const createBook = (req, res) => {
  if (req.body === undefined) return res.json({ error: "No body provided" });
  if (
    req.body.title === null ||
    req.body.genre_id === null ||
    req.body.author_id === null
  )
    return res.json({ error: "No values provided" });

  connection.query(
    "SELECT * FROM books WHERE title = $1 AND genre_id = $2 AND author_id = $3",
    [req.body.title, req.body.genre_id, req.body.author_id],
    (err, rows, fields) => {
      if (err) throw err;

      if (rows.rows.length > 1) {
        return res.status(409).json({ error: "Book already exists" });
      } else {
        connection.query(
          `INSERT INTO books(title, genre_id, author_id) VALUES($1, $2, $3)`,
          [req.body.title, req.body.genre_id, req.body.author_id],
          (err, rows, fields) => {
            if (err) throw err;

            return res.json({});
          },
        );
      }
    },
  );
};

export default createBook;
