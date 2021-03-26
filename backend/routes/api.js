const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const { dbConfig } = require("../config");

const db = mysql.createConnection(dbConfig);

router.post("/register", (req, res) => {
  const login = req.body.login;
  const password = req.body.password;
  db.query("SELECT * FROM users WHERE login = ?", [login], (err, result) => {
    if (err) {
      res.send({ error: err });
      return;
    }
    if (result.length > 0) {
      res.send({ message: "User already exists!" });
      return;
    }
    db.query(
      "INSERT INTO users (login,password) VALUES (?,?)",
      [login, password],
      (err, result) => {
        if (err) {
          res.send({ error: err });
        }
        res.send({ success: true });
      }
    );
  });
});

router.post("/login", (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE login = ? AND password = ?",
    [login, password],
    (err, result) => {
      if (err) {
        res.send({ error: err });
        return;
      }
      if (result.length > 0) {
        res.send(result);
        return;
      }
      res.send({ message: "Wrong credentials or user doesn't exists!" });
    }
  );
});

module.exports = router;
