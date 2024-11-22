const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const pool = require('./db');
const app = express();
const PORT = 3000;


app.use(express.static(path.join(__dirname, 'public'), {
    extensions: ['html'], 
  }));
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    next();
  });
  

app.post('/forms/submit-feedback.php', async (req, res) => {
    console.log('Request body:', req.body);

    const { name, email, star_rating, comments } = req.body;

    if (!name || !star_rating || !comments) {
        return res.status(400).json({ message: "Name, star rating, and comments are required." });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO feedback (name, email, star_rating, comments) VALUES (?, ?, ?, ?)',
            [name, email || null, star_rating, comments]
        );
        res.status(200).json({ message: 'Feedback submitted successfully!', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Database error occurred while submitting feedback.' });
    }
});


app.get('/forms/feedbacks.php', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT name, star_rating, comments, created_at FROM feedback ORDER BY created_at DESC LIMIT 10');
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching feedback.' });
    }
});
app.use((req, res) => {
    res.status(404).send('Resource not found');
  });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
