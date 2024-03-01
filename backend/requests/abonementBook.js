import connection from "../src/database.js";

const abonementBook = (req, res) => {
    if (req.body === undefined) return res.json({ error: "No body provided" });

    const [date, splitDate] = String(req.body.date_out).split("T");

    connection.query("SELECT * FROM abonement_books WHERE book_id = $1 AND reader_id = $2", [req.body.book_id, req.body.reader_id], (err, rows, fields) => {
        if (err) throw err;

        if (rows.rows.length > 1) {
            return res.status(409).json({ error: "This reader already abonement this book" });
        } else {
            connection.query("INSERT INTO abonement_books(book_id, reader_id, date_out, date_in) VALUES($1, $2, $3, $4)", [req.body.book_id, req.body.reader_id, date, req.body.date_in], (err, rows, fields) => {
                console.log(req.body);
                if (err) throw err;

                return res.status(200).json({});
            });
        };
    });
};

export default abonementBook;
