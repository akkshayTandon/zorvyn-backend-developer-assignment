const db = require("../db");

exports.getSummary = (req, res) => {
    try {
        const income = db.prepare(`
      SELECT SUM(amount) as total FROM financial_records WHERE type = 'INCOME'
    `).get();

        const expenses = db.prepare(`
      SELECT SUM(amount) as total FROM financial_records WHERE type = 'EXPENSE'
    `).get();

        const totalIncome = income.total || 0;
        const totalExpenses = expenses.total || 0;

        res.json({
            totalIncome,
            totalExpenses,
            netBalance: totalIncome - totalExpenses
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCategoryBreakdown = (req, res) => {
    try {
        const data = db.prepare(`
      SELECT category, SUM(amount) as total
      FROM financial_records
      GROUP BY category
    `).all();

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getRecentActivity = (req, res) => {
    try {
        const data = db.prepare(`
      SELECT * FROM financial_records
      ORDER BY date DESC
      LIMIT 5
    `).all();

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMonthlyTrends = (req, res) => {
    try { 
        const data = db.prepare(`
      SELECT 
        strftime('%Y-%m', date) as month,
        SUM(CASE WHEN type = 'INCOME' THEN amount ELSE 0 END) as income,
        SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) as expenses
      FROM financial_records
      GROUP BY month
      ORDER BY month ASC
    `).all();

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};