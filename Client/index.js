const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678', // Replace with your MySQL password
    database: 'rent_management_system' // Replace with your database name
});


app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.get('/login1', (req, res) => {
    res.sendFile(__dirname + '/public/loginUser.html');
});
app.get('/UserPage', (req, res) => {
    res.sendFile(__dirname + '/public/UserPage.html');
});
app.get('/OwnerPage', (req, res) => {
    res.sendFile(__dirname + '/public/OwnerPage.html');
});
app.post('/login1', function(req,res){
    var n1 = Number(req.body.userid);
    var n2 = req.body.uname;
    var n3 = req.body.phoneno;
    var sql = "INSERT INTO user VALUES (? , ? , ?);";
    connection.query(sql,[n1 , n2, n3], function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    res.redirect('/UserPage');
});

app.get('/login2', (req, res) => {
    res.sendFile(__dirname + '/public/loginOwner.html');
});
app.post('/login2', function(req,res){
    var n1 = Number(req.body.owenerid);
    var n2 = req.body.oname;
    var n3 = req.body.ophone;
    var sql = "INSERT INTO owner VALUES (? , ? , ?);";
    connection.query(sql,[n1 , n2, n3], function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    res.redirect('/OwnerPage');
});

app.post('/OwnerPage', function(req,res){
    var n1 = Number(req.body.rid);
    var n2 = Number(req.body.owenerid);
    var n3 = Number(req.body.price);
    var n4 = req.body.location;
    var n5 = Number(req.body.nobed);
    var sql = "INSERT INTO rent VALUES (? , ? , ? , ? , ?);";
    connection.query(sql,[n1 , n2, n3 , n4 , n5], function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    res.sendFile(__dirname + '/public/OwnerPage.html');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
