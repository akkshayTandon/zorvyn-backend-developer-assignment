const db = require("../db");

exports.createUser = (req, res) => {
    const { name, email, role } = req.body;

    if (!name || !email || !role) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    if (!["VIEWER", "ANALYST", "ADMIN"].includes(role)) {
        return res.status(400).json({
            message: "Invalid role"
        });
    }

    try {
        const stmt = db.prepare(`
      INSERT INTO users (name, email, role)
      VALUES (?, ?, ?)
    `);

        const result = stmt.run(name, email, role);

        res.status(201).json({ message: "User created successfully", id: result.lastInsertRowid });
    } catch (err) {
        res.status(400).json({ message: "Error creating user", error: err.message });
    }
};

exports.getUsers = (req, res) => {
    try{
        const users = db.prepare("SELECT * FROM users").all();
        res.json(users);
    } catch (err) {
        res.status(400).json({ message: "Error fetching users", error: err.message });
    }
};