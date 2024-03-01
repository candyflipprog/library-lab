import connection from "../src/database.js";

const createAuthor = (req, res) => {
    if (req.body === undefined) return res.json({ error: "No body provided" });

    const [date, splitDate] = String(req.body.birthday).split("T");

    connection.query("SELECT * FROM authors WHERE name = $1 AND birthday = $2", [req.body.name, date], (err, rows, fields) => {
        if (err) throw err;

        if (rows.rows.length > 1) {
            return res.status(409).json({ error: "Author already exists" });
        } else {
            connection.query("INSERT INTO authors(name, birthday) VALUES($1, $2)", [req.body.name, date], (err, rows, fields) => {
                if (err) throw err;

                return res.json({});
            })
        }
    })

};

export default createAuthor;
