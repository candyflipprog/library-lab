import connection from "../src/database.js";

const getAuthors = async (req, res) => {
  if (req.body === undefined) return res.json({ error: "No body provided" });

  connection.query(`SELECT * FROM authors`, (err, rows) => {
    if (err) throw err;

    return res.json(rows.rows);
  });
};

export default getAuthors;
