const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const http = require("http");
const app = express();
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
// Create MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678", // Replace with your MySQL password
  database: "rent_management_system", // Replace with your database name
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/login1", (req, res) => {
  res.sendFile(__dirname + "/public/loginUser.html");
});
app.get("/Ulogin", (req, res) => {
  res.sendFile(__dirname + "/public/Ulogin.html");
});
app.get("/Ologin", (req, res) => {
    res.sendFile(__dirname + "/public/Ologin.html");
  });
app.get("/UserPage", (req, res) => {
  res.sendFile(__dirname + "/public/UserPage.html");
});
app.get("/OwnerPage", (req, res) => {
  res.sendFile(__dirname + "/public/OwnerPage.html");
});
app.post("/login1", function (req, res) {
  var n1 = req.body.userid;
  var n2 = req.body.uname;
  var n3 = req.body.phoneno;
  var n4 = req.body.upasswd;
  var sql = "INSERT INTO user VALUES (? , ? , ? , ?);";
  connection.query(sql, [n1, n2, n3, n4], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  res.redirect("/UserPage");
});

app.get("/login2", (req, res) => {
  res.sendFile(__dirname + "/public/loginOwner.html");
});
app.post("/login2", function (req, res) {
  var n1 = Number(req.body.owenerid);
  var n2 = req.body.oname;
  var n3 = req.body.ophone;
  var n4 = req.body.opasswd;
  var sql = "INSERT INTO owner VALUES (? , ? , ? , ?);";
  connection.query(sql, [n1, n2, n3, n4], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  res.redirect("/OwnerPage");
});

app.post("/Ulogin", function (req, res, next) {
  var user_id = req.body.uid;
  var pssword = req.body.pasd;
  connection.query(
    "SELECT * FROM user WHERE user_id = ? AND password = ?;",
    [user_id, pssword],
    function (err, data, fields) {
      if (err) throw err;
      if (data.length > 0) {
        res.redirect("/UserPage");
      } else {
        res.redirect("/Ulogin");
      }
    }
  );
});

app.post("/Ologin", function (req, res, next) {
    var user_id = req.body.oid;
    var pssword = req.body.pasw2;
    connection.query(
      "SELECT * FROM owner WHERE owner_id = ? AND password = ?;",
      [user_id, pssword],
      function (err, data, fields) {
        if (err) throw err;
        if (data.length > 0) {
          res.redirect("/OwnerPage");
        } else {
          res.redirect("/Ologin");
        }
      }
    );
  });

app.post("/OwnerPage", function (req, res) {
  var n1 = Number(req.body.rid);
  var n2 = Number(req.body.owenerid);
  var n3 = Number(req.body.price);
  var n4 = req.body.location;
  var n5 = Number(req.body.nobed);
  var sql = "INSERT INTO rent VALUES (? , ? , ? , ? , ?);";
  connection.query(sql, [n1, n2, n3, n4, n5], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  res.sendFile(__dirname + "/public/OwnerPage.html");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
