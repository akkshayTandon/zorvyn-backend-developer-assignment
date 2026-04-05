const db = require("../db");

module.exports = (req, res, next) => {
    const userId = req.headers["user-id"];

    if (!userId) {
        return res.status(401).json({ message: "No user ID provided" });
    }

    const user = db
        .prepare("SELECT * FROM users WHERE id = ?")
        .get(userId);

    if (!user) {
        return res.status(401).json({ message: "Invalid user" });
    }

    req.user = user;
    next();
};