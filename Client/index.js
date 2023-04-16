const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname));

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678', // Replace with your MySQL password
    database: 'library' // Replace with your database name
});

// Connect to MySQL
connection.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

app.get("/",(req,res)=>{
    res.sendFile(__dirname + '/public/index.html');
})


// Add a book
app.post('/addBook', (req, res) => {
    const { title, author, genre } = req.body;
    const query = 'INSERT INTO books (title, author, genre) VALUES (?, ?, ?)';
    connection.query(query, [title, author, genre], (err, result) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            const book = { id: result.insertId, title, author, genre };
            res.json(book);
        }
    });
});

// Get all books
app.get('/getBooks', (req, res) => {
    const query = 'SELECT * FROM books';
    connection.query(query, (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(rows);
        }
    });
});

// Delete a book
app.delete('/deleteBook/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM books WHERE id = ?';
    connection.query(query, [id], err => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.sendStatus(200);
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
