//const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const pool = require('./db'); // Assuming your DB connection is in db.js
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
// Serve static files from the "public" directory
// Serve static files (HTML, JS, CSS)
app.use(express.static(path.join(__dirname, 'public'), {
    extensions: ['html'], // Automatically resolve .html files
  }));
  /*
app.use(express.static(path.join(__dirname, 'public')));*/
// Add body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Route to serve the main page


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Proxy PHP requests to the PHP server running on port 8080
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    next();
  });
  /*
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
  });

app.use(
    '/forms',
    createProxyMiddleware({
      target: 'http://localhost:8080', // PHP server
      changeOrigin: true,
      logLevel: 'debug', // Debug logging for the middleware
      pathRewrite: {}, // No path rewriting
      onProxyReq: (proxyReq, req) => {
        console.log(`Proxying: ${req.method} ${req.url}`);
      },
      onProxyRes: (proxyRes, req) => {
        console.log(`Proxied response status: ${proxyRes.statusCode}`);
      },
      logLevel: 'debug', // Enable detailed logs
    })
  );
  */
// Feedback route
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
//app.use(express.static(path.join(__dirname, 'public_html')));
// Endpoint to retrieve all feedback (admin view)

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
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
