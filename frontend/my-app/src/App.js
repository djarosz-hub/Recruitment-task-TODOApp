import React, { useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [loginRegister, setLoginRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = () => {
    Axios.post("http://localhost:3001/register", {
      login: loginRegister,
      password: passwordRegister,
    }).then((res) => {
      console.log(res);
    });
  };
  const loginUser = () =>{
    Axios.post("http://localhost:3001/login", {
      login: login,
      password: password,
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="App">
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
        <input type="text" onChange={(e) => {
            setPassword(e.target.value);
          }}/>
        <button onClick={loginUser}> login</button>
      </div>
    </div>
  );
}

export default App;
