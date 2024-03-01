import connection from "../src/database.js";

const getReaders = (req, res) => {
    if (req.body === undefined) return res.json({ error: "No body provided" });

    connection.query("SELECT * FROM readers", (err, rows, fields) => {
        if (err) throw err;

        return res.json(rows.rows);
    });
};

export default getReaders;
