import pg from "pg";
const { Pool } = pg;

const connection = new Pool({
    host: "127.0.0.1",
    port: 5432,
    database: "lab2",
    user: "postgres"
});

export default connection;
