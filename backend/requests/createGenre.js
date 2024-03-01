import connection from "../src/database.js";

const createGenre = (req, res) => {
  if (req.body === undefined) return res.json({ error: "No body provided" });

  connection.query(
    "SELECT * FROM genres WHERE name = $1",
    [req.body.name],
    (err, rows, fields) => {
      if (err) throw err;

      if (rows.rows.length > 1) {
        return res.status(409).json({ error: "Genre already exists" });
      } else {
        connection.query(
          "INSERT INTO genres(description, name) VALUES($1, $2)",
          [req.body.description, req.body.name],
          (err, rows, fields) => {
            if (err) throw err;

            return res.status(200).json({});
          },
        );
      }
    },
  );
};

export default createGenre;
