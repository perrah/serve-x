const mysql = require('mysql2');

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',  // Your MySQL username
    password: '',  // Your MySQL password
    database: 'feedback'
});

module.exports = pool.promise();  // Use promise-based queries for async/await
