const express = require('express');

const userRoutes = require('./routes/userRoutes');
const recordRoutes = require("./routes/recordRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");



const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
    res.send("API is running");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}, visit http://localhost:${PORT}/`);
});