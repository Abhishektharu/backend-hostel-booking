import db from "../db.js";

export const createBooking = (req, res) => {
    const { user_id, room_id, check_in, check_out, total_price } = req.body;

    db.query(
        `INSERT INTO bookings (user_id, room_id, check_in, check_out, total_price)
         VALUES (?, ?, ?, ?, ?)`,
        [user_id, room_id, check_in, check_out, total_price],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "Booking created", id: result.insertId });
        }
    );
};

export const getBookings = (req, res) => {
    db.query("SELECT * FROM bookings", (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

export const getBookingById = (req, res) => {
    db.query("SELECT * FROM bookings WHERE id=?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result[0]);
    });
};

export const updateBooking = (req, res) => {
    const { check_in, check_out, status } = req.body;

    db.query(
        "UPDATE bookings SET check_in=?, check_out=?, status=? WHERE id=?",
        [check_in, check_out, status, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "Booking updated" });
        }
    );
};

export const cancelBooking = (req, res) => {
    db.query(
        "UPDATE bookings SET status='cancelled' WHERE id=?",
        [req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "Booking cancelled" });
        }
    );
};
