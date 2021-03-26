const express = require('express');
const mysql = require('mysql');
const cors = require ('cors');
const app = express();

app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "tododb"
});

app.post('/register', (req,res)=>{

    const login = req.body.login;
    const password = req.body.password;

    db.query("INSERT INTO users (login,password) VALUES (?,?)", [login,password], (err, result)=>{
        console.log(err)
    })
});

app.post('/login', (req,res)=>{
    const login = req.body.login;
    const password = req.body.password;

    db.query("SELECT * FROM users WHERE login = ? AND password = ?", [login,password], (err, result)=>{
        if(err){
            res.send({error:err});
        }
        
        if(result){
            res.send(result);
        }
        else{
            res.send({message: "Wrong credentials or user doesn't exists!"});
        }
    })
});

app.listen(3001, () => {
    console.log("server is running at port 3001");
})