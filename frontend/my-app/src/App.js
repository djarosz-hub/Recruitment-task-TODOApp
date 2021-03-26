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
    </div>
  );
}

export default App;
