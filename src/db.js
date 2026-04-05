// import Database from "better-sqlite3";

const Database = require("better-sqlite3");

const db = new Database("zorvyn_database.db");

// Create tables
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('VIEWER', 'ANALYST', 'ADMIN')),
  status TEXT DEFAULT 'ACTIVE' CHECK(status IN ('ACTIVE', 'INACTIVE')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS financial_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  amount REAL NOT NULL CHECK(amount >= 0),
  type TEXT NOT NULL CHECK(type IN ('INCOME', 'EXPENSE')),
  category TEXT NOT NULL,
  date DATETIME NOT NULL,
  notes TEXT,
  user_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id)
);
`);

module.exports = db;

// export default db;