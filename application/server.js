const { Client } = require("pg");

const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer"); // v1.0.5
const upload = multer(); // for parsing multipart/form-data
app.use(bodyParser.json()); // for parsing application/json

app.set("view engine", "ejs");
app.set("view options", {
  layout: false,
});

const client = new Client({
  user: "postgres",
  password: "password",
  host: "localhost",
  port: "5432",
  database: "A3_Q1",
});

client
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database", err);
  });

app.get("/client.js", (req, res) => {
  res.sendFile(path.join(__dirname, "/client.js"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/get.html"));
});

app.get("/get.html", (req, res) => {
  res.sendFile(path.join(__dirname, "/get.html"));
});

app.get("/add.html", (req, res) => {
  res.sendFile(path.join(__dirname, "/add.html"));
});

app.get("/update.html", (req, res) => {
  res.sendFile(path.join(__dirname, "/update.html"));
});

app.get("/delete.html", (req, res) => {
  res.sendFile(path.join(__dirname, "/delete.html"));
});

app.post("/get", upload.array(), (req, res) => {
  console.log(req.body);
  client.query("SELECT * from students", (err, result) => {
    if (err) {
      console.error("Error executing query", err);
    } else {
      console.log("Query result:", result.rows);
      res.json(result.rows);
    }
  });
});

app.post("/add", upload.array(), (req, res) => {
  const first = req.body.first;
  const last = req.body.last;
  const email = req.body.email;
  const enrollment = req.body.enrollment;
  const fullname = req.body.fullname;
  client.query(
    "INSERT into students (first_name, last_name, email, enrollment_date) VALUES($1, $2, $3, $4) RETURNING *",
    [first, last, email, enrollment],
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("row inserted with id: " + result.rows[0].id);
      }
    }
  );
});

app.post("/update", upload.array(), (req, res) => {
  const id = req.body.id;
  const email = req.body.email;
  client.query(
    "UPDATE students SET email = ($1) WHERE student_id=($2)",
    [email, id],
    function (err, result) {
      if (err) {
        console.log(err);
      }
    }
  );
});

app.post("/delete", upload.array(), (req, res) => {
  const id = req.body.id;
  console.log(id);
  const email = req.body.email;
  client.query(
    "DELETE FROM students WHERE student_id = ($1)",
    [id],
    function (err, result) {
      if (err) {
        console.log(err);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is listening at port http://127.0.0.1:3000/`);
});
