import db from "../db.js";

export const createRoom = (req, res) => {
    const { hostel_id, room_number, room_type, price } = req.body;

    db.query(
        "INSERT INTO rooms (hostel_id, room_number, room_type, price) VALUES (?, ?, ?, ?)",
        [hostel_id, room_number, room_type, price],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "Room created", id: result.insertId });
        }
    );
};

export const getRooms = (req, res) => {
    db.query("SELECT * FROM rooms", (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

export const getRoomById = (req, res) => {
    db.query("SELECT * FROM rooms WHERE id=?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result[0]);
    });
};

export const updateRoom = (req, res) => {
    const { price, room_type, room_number } = req.body;

    db.query(
        "UPDATE rooms SET price=?, room_type=?, room_number=? WHERE id=?",
        [price, room_type, room_number, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "Room updated" });
        }
    );
};

export const deleteRoom = (req, res) => {
    db.query("DELETE FROM rooms WHERE id=?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Room deleted" });
    });
};
