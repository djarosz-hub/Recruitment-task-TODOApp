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
  function emptyCredentialsAlert() {
    alert("Username or password can't be empty!");
  }
  function emptyNoteAlert() {
    alert("Note title or note body can't be empty!");
  }
  const registerUser = () => {
    if (loginRegister === "" || passwordRegister === "") {
      return emptyCredentialsAlert();
    }
    try {
      Axios.post("http://localhost:3001/register", {
        login: loginRegister,
        password: passwordRegister,
      }).then((res) => {
        if (res.data.error) {
          console.log("something went wrong");
          return;
        }
        console.log(res.data.message);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const loginUser = () => {
    if (login === "" || password === "") {
      return emptyCredentialsAlert();
    }
    try {
      Axios.post("http://localhost:3001/login", {
        login: login,
        password: password,
      }).then((res) => {
        if (res.data.error) {
          console.log("something went wrong");
          return;
        }
        if (res.data.message) {
          console.log(res.data.message);
          return;
        }
        setId(res.data[0].id);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const getAllNotes = () => {
    Axios.get("http://localhost:3001/notes", {
      params: {
        login: loggedId,
      },
    }).then((res) => {
      if (res.message) {
        console.log(res.message.data);
        return;
      }
      console.log(res.data);
    });
  };
  const getNote = (noteId) => {
    try {
      Axios.get(`http://localhost:3001/notes/${noteId}`, {
        params: {
          nId: noteId,
          login: loggedId,
        },
      })
        .then((res) => {
          if (res.status === 400) {
            console.log(res.error);
            return;
          }
          console.log(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const addNote = (noteTitle, noteBody) => {
    if (noteTitle === "" || noteBody === "") {
      return emptyNoteAlert();
    }
    try {
      Axios.post("http://localhost:3001/notes", {
        title: noteTitle,
        body: noteBody,
        owner: loggedId,
      })
        .then((res) => {
          console.log(res.data.message);
        })
        .catch((err) => {
          console.log(`note adding failed`);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const editNote = (noteId, noteTitle, noteBody) => {
    if (noteTitle === "" || noteBody === "") {
      return emptyNoteAlert();
    }
    try {
      Axios.put(`http://localhost:3001/notes/${noteId}`, {
        login: loggedId,
        id: noteId,
        title: noteTitle,
        body: noteBody,
      }).then((res) => {
        if (res.status === 204) console.log("successfully updated note");
      }).catch((error)=>{
        console.log(error);
      })
    } catch (error) {
      console.log(`error updating data: ${error}`);
    }
  };

  const deleteNote = (noteId) => {
    try {
      Axios.delete(`http://localhost:3001/notes/${noteId}`, {
        data: {
          login: loggedId,
          id: noteId,
        },
      })
        .then((res) => {
          if (res.status === 204) console.log("successfully deleted note");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(`error deleting data: ${error}`);
    }
  };

  function takeNoteValues() {
    const title = document.getElementById("tytul").value;
    const val = document.getElementById("tresc").value;
    addNote(title, val);
  }
  function editNoteValues(noteId) {
    const title = document.getElementById("tytuledit").value;
    const val = document.getElementById("trescedit").value;
    editNote(noteId, title, val);
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
      <button onClick={() => getAllNotes()}>pobierz wszystkie notki</button>
      <button onClick={() => getNote(5)}>pobierz 1 notke</button>
      <input placeholder="tytul" id="tytul"></input>
      <input placeholder="body" id="tresc"></input>
      <button onClick={() => takeNoteValues()}>dodaj notke</button>
      <button onClick={() => deleteNote(14)}>usun notatke</button>
      <div>
        <input placeholder="tytul" id="tytuledit"></input>
        <input placeholder="body" id="trescedit"></input>
        <button onClick={() => editNoteValues(9)}>edytuj notke</button>
      </div>
    </div>
  );
}

export default App;
