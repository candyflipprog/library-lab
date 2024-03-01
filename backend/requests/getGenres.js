import connection from "../src/database.js";

const getGenres = async (req, res) => {
    if(req.body === undefined) return res.json({ error: "No body provided" });

    await connection.query(`SELECT * FROM genres`, (err, rows, fields) => {
        if(err) throw err;

        return res.json(rows.rows);
    });
};

export default getGenres;
