const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const ejs = require('ejs');
const http = require("http");
const app = express();
app.set('view engine', 'ejs');
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
  res.render(__dirname + "/views/index.ejs");
});
app.get("/Price", (req, res) => {
  res.render(__dirname + "/views/Price.ejs");
});
app.get("/1", (req, res) => {
  res.render(__dirname + "/views/1.ejs");
});
app.get("/2", (req, res) => {
  res.render(__dirname + "/views/2.ejs");
});
app.get("/3", (req, res) => {
  res.render(__dirname + "/views/3.ejs");
});
app.get("/4", (req, res) => {
  res.render(__dirname + "/views/4.ejs");
});
app.get("/5", (req, res) => {
  res.render(__dirname + "/views/5.ejs");
});
app.get("/6", (req, res) => {
  res.render(__dirname + "/views/6.ejs");
});
app.get("/7", (req, res) => {
  res.render(__dirname + "/views/7.ejs");
});
app.get("/8", (req, res) => {
  res.render(__dirname + "/views/8.ejs");
});
app.get("/9", (req, res) => {
  res.render(__dirname + "/views/9.ejs");
});
app.get("/10", (req, res) => {
  res.render(__dirname + "/views/10.ejs");
});
app.get("/Location", (req, res) => {
  res.render(__dirname + "/views/Location.ejs");
});
app.get("/Bedroom", (req, res) => {
  res.render(__dirname + "/views/Bedroom.ejs");
});

app.get("/login1", (req, res) => {
  res.render(__dirname + "/views/loginUser.ejs");
});
app.get("/Ulogin", (req, res) => {
  res.render(__dirname + "/views/Ulogin.ejs");
});
app.get("/Ologin", (req, res) => {
  res.render(__dirname + "/views/Ologin.ejs");
});
app.get("/UserPage", (req, res) => {
  res.render(__dirname + "/views/UserPage.ejs");
});
app.get("/OwnerPage", (req, res) => {
  res.render(__dirname + "/views/OwnerPage.ejs");
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
  res.render(__dirname + "/views/loginOwner.ejs");
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
  var n2 = req.body.owenerid;
  var n3 = Number(req.body.price);
  var n4 = req.body.location;
  var n5 = Number(req.body.nobed);
  var sql = "INSERT INTO rent VALUES (? , ? , ? , ? , ?);";
  connection.query(sql, [n1, n2, n3, n4, n5], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  connection.query("SELECT * FROM rent", function (err, result, fields) {
    res.send(result);
    if (err) throw err;
  });
});
app.post("/Price", function (req, res) {
  var n1 = Number(req.body.minprice);
  var n2 = Number(req.body.maxprice);
  var sql = "SELECT owner.name,owner.phone,rent.price ,rent.location, rent.no_of_bedrooms FROM rent INNER JOIN owner ON rent.owner_id = owner.owner_id WHERE rent.price >= ? AND rent.price <= ? ORDER BY rent.price ASC;";
  connection.query(sql, [n1, n2], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/Location", function (req, res) {
  var n1 = req.body.location1;
  var sql = "SELECT o.name, o.phone , r.location , r.price , r.rent.no_of_bedrooms FROM rent r INNER JOIN owner o ON r.owner_id = o.owner_id WHERE r.location = ?;";
  connection.query(sql, [n1], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/Bedroom", function (req, res) {
  var n1 = Number(req.body.bedrooms);
  var sql = "SELECT owner.name,owner.phone,rent.price ,rent.location, rent.no_of_bedrooms FROM rent INNER JOIN owner ON rent.owner_id = owner.owner_id WHERE rent.no_of_bedrooms = ?;";
  connection.query(sql, [n1], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
app.post("/1", function (req, res) {
  var sql = "SELECT AVG(price) AS avg_rent_price FROM rent;";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
app.post("/2", function (req, res) {
  var sql = "SELECT owner.name, COUNT(*) AS no_of_rents FROM owner INNER JOIN rent ON owner.owner_id = rent.owner_id GROUP BY owner.owner_id ORDER BY no_of_rents DESC LIMIT 1;";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
app.post("/3", function (req, res) {
  var sql = "SELECT DISTINCT owner.name FROM owner INNER JOIN rent ON owner.owner_id = rent.owner_id WHERE rent.location IN ('adalaj', 'Maninagar');";
   connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
app.post("/4", function (req, res) {
  var sql = "SELECT SUM(no_of_bedrooms) AS total_bedrooms FROM rent WHERE location = 'bopal';";
   connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
app.post("/5", function (req, res) {
  var sql = "SELECT * FROM rent WHERE no_of_bedrooms > 2 ORDER BY price DESC;";
   connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
app.post("/6", function (req, res) {
  var sql = "SELECT DISTINCT owner.name FROM owner INNER JOIN rent ON owner.owner_id = rent.owner_id WHERE rent.location IN ('SBR', 'Nikol') AND rent.no_of_bedrooms >= 2;";
   connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
app.post("/7", function (req, res) {
  var sql = "SELECT location, AVG(price) AS avg_rent_price FROM rent GROUP BY location ORDER BY avg_rent_price ASC;";
   connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
app.post("/8", function (req, res) {
  var sql = "SELECT rent.*, owner.name FROM rent INNER JOIN owner ON rent.owner_id = owner.owner_id WHERE rent.no_of_bedrooms = (SELECT MAX(no_of_bedrooms) FROM rent);";
   connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
app.post("/9", function (req, res) {
  var sql = "SELECT location, COUNT(*) AS no_of_rents FROM rent GROUP BY location;";
   connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
app.post("/10", function (req, res) {
  var sql = "SELECT DISTINCT owner.name FROM owner INNER JOIN rent ON owner.owner_id = rent.owner_id WHERE rent.price > (SELECT AVG(price) FROM rent);";
   connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
