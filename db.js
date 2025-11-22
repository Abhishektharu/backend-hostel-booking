import mysql from "mysql2";

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "hostel_booking"
});

export default db;
