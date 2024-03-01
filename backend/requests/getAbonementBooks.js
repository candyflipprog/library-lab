import connection from "../src/database.js";

const getAbonementBooks = (req, res) => {
    if(req.body === undefined) return res.json({ error: "No body provided" });

    connection.query("SELECT * FROM abonement_books", (err, rows, fields) => {
        if(err) throw err;

        return res.json(rows.rows);
    })
};

export default getAbonementBooks;
