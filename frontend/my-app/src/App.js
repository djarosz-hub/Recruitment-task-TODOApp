import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [loginRegister, setLoginRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [loggedId, setId] = useState("");

  useEffect(() => {
    if (loggedId !== "") console.log("changed:", loggedId);
  }, [loggedId]);

  const registerUser = () => {
    if (loginRegister === "" || passwordRegister === "") {
      console.log("empty");
      return;
    }
    Axios.post("http://localhost:3001/register", {
      login: loginRegister,
      password: passwordRegister,
    })
      .then((res) => {
        if (res.data.err) {
          console.log("something went wrong");
          return;
        }
        if (res.data.message) {
          console.log(res.data.message);
          return;
        }
        console.log("successfully created");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loginUser = () => {
    if (login === "" || password === "") {
      console.log("empty");
      return;
    }
    Axios.post("http://localhost:3001/login", {
      login: login,
      password: password,
    }).then((res) => {
      if (res.data.err) {
        console.log("something went wrong");
        return;
      }
      if (res.data.message) {
        console.log(res.data.message);
        return;
      }
      setId(res.data[0].id);
    });
  };
  const getAllNotes = () => {
    Axios.get("http://localhost:3001/notes", {
      params:{
        login:loggedId
      }
    }).then((res)=>{
      if(res.message){
        console.log(res.message.data)
        return;
      }
      console.log(res.data);
    });
  };
  const getNote = (noteId)=>{
    Axios.get(`http://localhost:3001/notes/${noteId}`, {
      params:{
        id:noteId
      }
    }).then((res)=>{
      if(res.message){
        console.log(res.message.data)
        return;
      }
      console.log(res.data);
    });
  }
  return (
    <div className="App">
      <div>
        <h1>register</h1>
        <div>
          <label>username</label>
          <input
            type="text"
            onChange={(e) => {
              setLoginRegister(e.target.value);
            }}
          />
          <label>pass</label>
          <input
            type="text"
            onChange={(e) => {
              setPasswordRegister(e.target.value);
            }}
          />
          <button onClick={registerUser}> register</button>
        </div>

        <h1>login</h1>
        <div>
          <label>username</label>
          <input
            type="text"
            onChange={(e) => {
              setLogin(e.target.value);
            }}
          />
          <label>pass</label>
          <input
            type="text"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={loginUser}> login</button>
        </div>
      </div>
      <button onClick={()=>getAllNotes()}>pobierz notki</button>
      <button onClick={()=>getNote(4)}>notke</button>
    </div>
  );
}

export default App;
