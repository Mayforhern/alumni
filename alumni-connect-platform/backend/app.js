const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

const db = new sqlite3.Database('./database/alumni.db', (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the alumni database.');
    }
});

app.use(express.json());

// Signup route
app.post('/api/signup', (req, res) => {
    const { name, email, industry, interests } = req.body;
    const sql = 'INSERT INTO users (name, email, industry, interests) VALUES (?, ?, ?, ?)';
    db.run(sql, [name, email, industry, interests], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
});

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the Alumni Connect Platform!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Closing the database connection
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database ' + err.message);
        }
        process.exit(0);
    });
});