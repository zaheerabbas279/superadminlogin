const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "collegedb",
});

db.connect((err) => {
  if (err) {
    console.log("error connecting to the database");
  } else {
    console.log("connected to database successfully");
  }
});

module.exports = db;
