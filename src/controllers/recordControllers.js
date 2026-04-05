const db = require("../db");

exports.createRecord = (req, res) => {
    const { amount, type, category, date, notes } = req.body;

    if (!amount || !type || !category || !date) {
        return res.status(400).json({
            message: "Missing required fields"
        });
    }

    if (!["INCOME", "EXPENSE"].includes(type)) {
        return res.status(400).json({
            message: "Invalid type"
        });
    }

    try {
        const stmt = db.prepare(`
      INSERT INTO financial_records 
      (amount, type, category, date, notes, user_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

        const result = stmt.run(
            amount,
            type,
            category,
            date,
            notes,
            req.user.id
        );

        res.status(201).json({ message: "Record created successfully", id: result.lastInsertRowid });
    } catch (err) {
        res.status(400).json({ message: "Error creating record", error: err.message });
    }
};

exports.getRecords = (req, res) => {
    const { type, category, startDate, endDate } = req.query;

    let query = "SELECT * FROM financial_records WHERE 1=1";
    const params = [];

    if (type) {
        query += " AND type = ?";
        params.push(type);
    }

    if (category) {
        query += " AND category = ?";
        params.push(category);
    }

    if (startDate) {
        query += " AND date >= ?";
        params.push(startDate);
    }

    if (endDate) {
        query += " AND date <= ?";
        params.push(endDate);
    }

    try {
        const records = db.prepare(query).all(...params);
        res.status(200).json(records);
    } catch (err) {
        res.status(400).json({ message: "Error fetching records", error: err.message });
    }

};

exports.updateRecord = (req, res) => {
    const { id } = req.params;
    const { amount, type, category, date, notes } = req.body;

    try {
        const stmt = db.prepare(`
      UPDATE financial_records
      SET amount = ?, type = ?, category = ?, date = ?, notes = ?
      WHERE id = ?
    `);

        stmt.run(amount, type, category, date, notes, id);

        res.status(200).json({ message: "Record updated" });
    } catch (err) {
        res.status(400).json({ message: "Error updating record", error: err.message });
    }
};

exports.deleteRecord = (req, res) => {
    const { id } = req.params;

    try {
        db.prepare("DELETE FROM financial_records WHERE id = ?").run(id);
        res.status(200).json({ message: "Record deleted" });
    } catch (err) {
        res.status(400).json({ message: "Error deleting record", error: err.message });
    }
};