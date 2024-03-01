import connection from "../src/database.js";

const passTheBook = (req, res) => {
    if (req.body === undefined) return res.json({ error: "No body provided" });

    const [date, splitDate] = String(req.body.date_in).split("T");

    connection.query("UPDATE abonement_books SET date_in = $1 WHERE book_id = $2 AND reader_id = $3", [new Date(date), req.body.book_id, req.body_reader_id], (err, rows, fields) => {
        if (err) throw err;

        console.log(rows);

        res.status(200).json({});
    });
};

export default passTheBook;
