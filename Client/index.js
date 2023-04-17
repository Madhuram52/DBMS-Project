const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.json());
// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678', // Replace with your MySQL password
    database: 'rent_management_system' // Replace with your database name
});

// Connect to MySQL
connection.connect(err => {
    // if (err) throw err;
    // console.log('Connected to MySQL');
    // var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    // con.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log("1 record inserted");
    // });
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.get('/login1', (req, res) => {
    res.sendFile(__dirname + '/public/loginUser.html');
});

app.get('/login2', (req, res) => {
    res.sendFile(__dirname + '/public/loginOwner.html');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
