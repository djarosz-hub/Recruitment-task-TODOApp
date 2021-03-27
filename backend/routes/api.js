const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const { dbConfig } = require("../config");

const db = mysql.createConnection(dbConfig);

//authorize section
router.post("/register", (req, res) => {
  const { login, password } = req.body;
  try {
    db.query("SELECT * FROM users WHERE login = ?", [login], (err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      if (result.length > 0) {
        return res.status(200).json({ message: "User already exists!" });
      }
      db.query(
        "INSERT INTO users (login,password) VALUES (?,?)",
        [login, password],
        (err, result) => {
          if (err) {
            return res.status(400).json({ error: err });
          }
          return res.status(201).json({ message: "Successfully created user" });
        }
      );
    });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});
router.post("/login", (req, res) => {
  const { login, password } = req.body;
  try {
    db.query(
      "SELECT * FROM users WHERE login = ? AND password = ?",
      [login, password],
      (err, result) => {
        if (err) {
          res.send({ error: err });
          return;
        }
        if (result.length > 0) {
          // res.send(result);
          return res.status(200).json(result);
          // return;
        }
        return res
          .status(200)
          .json({ message: "Wrong credentials or user doesn't exists!" });
      }
    );
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

//utils section
router.get("/notes", (req, res) => {
  const login = req.query.login;
  try {
    db.query("SELECT * FROM notes WHERE owner = ?", [login], (err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      if (result.length == 0) {
        return res.status(200).json({ message: "no notes yet" });
      }
      res.send(result);
    });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});
router.get("/notes/:id", (req, res) => {
  const { nId, login } = req.query;
  try {
    db.query(
      "SELECT * FROM notes WHERE id = ? AND owner = ?",
      [nId, login],
      (err, result) => {
        if (err) {
          return res.status(400).json({ error: err });
        }
        return res.status(200).json(result);
      }
    );
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

router.post("/notes", (req, res) => {
  const { title, body, owner } = req.body;
  try {
    db.query(
      "INSERT INTO notes (title,body,owner) VALUES (?,?,?)",
      [title, body, owner],
      (err, result) => {
        if (err) {
          return res.status(400).json({ error: err });
        }
        // const addedNote = {
        //   id:result.data.insrtedId,
        //   title: result.config
        // }
        // const x = JSON.parse(JSON.stringify(result));
        // console.log(x)
        return res.status(201).json(result);
        // return res.status(201).json({ message: "Successfully created note!" });
      }
    );
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});
router.put("/notes/:id", async (req, res) => {
  const { login, id, title, body } = req.body;
  console.log(login)
  console.log(id)
  console.log(title)
  console.log(body)
  try{
    db.query(
    "UPDATE notes SET title = ?, body = ? WHERE id = ? AND owner = ?",
    [title,body,id,login],
    (err, result, fields) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      console.log('note updated');
      return res.status(204).json(result);
    }
    );
  }catch(err){
    return res.status(400).json({error:err});
  }
});
router.delete("/notes/:id", (req, res) => {
  const { login, id } = req.body;
  try {
    db.query(
      "DELETE FROM notes WHERE id = ? AND owner = ?",
      [id, login],
      (err, result) => {
        if (err) {
          return res.status(400).json({ error: err });
        }
        console.log('note deleted');
        return res.status(204).json({message: "successfully deleted"});
      }
    );
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});
module.exports = router;
