import db from "../db.js";

export const createHostel = (req, res) => {
    const { owner_id, name, address, city, description, rooms } = req.body;

    db.query(
        "INSERT INTO hostels (owner_id, name, address, city, rooms, description) VALUES (?, ?, ?, ?, ?, ?)",
        [owner_id, name, address, city, rooms, description],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "Hostel created", id: result.insertId });
        }
    );
};

export const getHostels = (req, res) => {
    db.query("SELECT * FROM hostels", (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
};

export const getHostelById = (req, res) => {
    db.query("SELECT * FROM hostels WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result[0]);
    });
};

export const updateHostel = (req, res) => {
    const { name, address, city, description } = req.body;

    db.query(
        "UPDATE hostels SET name=?, address=?, city=?, description=? WHERE id=?",
        [name, address, city, description, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "Hostel updated" });
        }
    );
};

export const deleteHostel = (req, res) => {
    db.query("DELETE FROM hostels WHERE id=?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Hostel deleted" });
    });
};
