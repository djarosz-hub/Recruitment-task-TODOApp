import React from "react";
import Register from "./Register";
import Login from "./Login";
import Note from "./Note";
import NewNote from "./NewNote";
import Modal from "react-modal";
import EditNote from "./EditNote";
import Axios from "axios";
import {Wrapper,LogoutButton} from "./styledElements/MainTodoStyledElements";

export function emptyCredentialsAlert() {
    alert("Username or password can't be empty!");
}
function emptyNoteAlert() {
    alert("Note title or note body can't be empty!");
}
export const baseUrl = "http://localhost:3001";

class Todo extends React.Component {
    state = {
        loggedId: null,
        notes: [],
        showEditModal: false,
        editNote: {}
    };

    deleteNote(id) {
        const notes = [...this.state.notes].filter(note => note.id !== id);
        try {
            Axios.delete(`${baseUrl}/notes/${id}`, {
                data: {
                    login: this.state.loggedId,
                    id: id,
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

        this.setState({ notes });
    };
    async addNote(note) {
        if (note.title === "" || note.body === "") {
            return emptyNoteAlert();
        }
        const notes = [...this.state.notes];
        try {
            const res = await Axios.post(`${baseUrl}/notes`, {
                title: note.title,
                body: note.body,
                owner: this.state.loggedId,
            });
            if (res.data.error) {
                return console.log(`error adding note: ${res.data.error}`)
            }
            const newNoteId = res.data.insertId;
            notes.push({ id: newNoteId, title: note.title, body: note.body });
            this.setState({ notes });
        }
        catch (error) {
            console.log(`error adding note: ${error}`);
        }
    }
    editNote(note) {
        try {
            Axios.put(`${baseUrl}/notes/${note.id}`, {
                login: this.state.loggedId,
                id: note.id,
                title: note.title,
                body: note.body,
            }).then((res) => {
                if (res.status === 204) {
                    console.log("successfully updated note");
                    const notes = [...this.state.notes];
                    const index = notes.findIndex(item => item.id === note.id);
                    if (index >= 0) {
                        notes[index] = note;
                        this.setState({ notes });
                    }
                }
            }).catch((error) => {
                console.log(error);
            })
        } catch (error) {
            console.log(`error updating data: ${error}`);
        }
        this.toggleModal();
    }
    toggleModal() {
        this.setState({ showEditModal: !this.state.showEditModal });
    }
    editNoteHandler(note) {
        this.toggleModal();
        this.setState({ editNote: note })
    }
    async getNotesFromApi() {
        Axios.get(`${baseUrl}/notes`, {
            params: {
                login: this.state.loggedId,
            },
        }).then((res) => {
            if (res.message) {
                console.log(res.message.data);
                return;
            }
            if (res.data.message) {
                console.log(res.data.message)
                return;
            }
            this.setState({ notes: res.data })
        });
    };
    async onLogin(res) {
        (res).then((id) => {
            this.setState({ notes: [] })
            if (id == null) {
                return
            }
            this.setState({ loggedId: id });
            this.getNotesFromApi();
        })
    }
    logoutUser = () => {
        this.setState({
            loggedId: null,
            notes: [],
        })
    }
    render() {
        return (
            <Wrapper>
                <Login setLoggedId={(id) => this.onLogin(id)}>

                </Login>
                <LogoutButton onClick={this.logoutUser}>Wyloguj</LogoutButton>
                <Register />
                <NewNote
                    onAdd={(note) => this.addNote(note)} />
                <Modal
                    isOpen={this.state.showEditModal}
                    contentLabel="Edytuj notatkę"
                    ariaHideApp={false}>
                    <EditNote onEdit={(note) => this.editNote(note)}
                        title={this.state.editNote.title}
                        body={this.state.editNote.body}
                        id={this.state.editNote.id}
                    />
                    <button onClick={() => this.toggleModal()}>Anuluj</button>
                </Modal>
                <div>
                    {this.state.notes.map((note) => (
                        <Note key={note.id}
                            title={note.title}
                            body={note.body}
                            id={note.id}
                            onDelete={(id) => this.deleteNote(id)}
                            onEdit={(note) => this.editNoteHandler(note)} />
                    ))}
                </div>
            </Wrapper>
        );
    }
}
export default Todo;
