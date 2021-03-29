import React from "react";
import Register from "./Register";
import Login from "./Login";
import Note from "./Note";
import NewNote from "./NewNote";
import EditNote from "./EditNote";
import Axios from "axios";
import { Wrapper, LogSectionWrapper, NotesSectionWrapper, LogoutButton, NotesContainer, H1, StyledModal } from "./styledElements/MainTodoStyledElements";
import styled from "styled-components";

export const baseUrl = "http://localhost:3001";

const NotifyContainer = styled.div`
    background-color:${props => props.col};
    color:white;
    padding:16px;
    position:absolute;
    top: ${props => props.top}px;
    right:20px;
    border-radius:10px;
    z-index:999;
    box-shadow: 0px 5px 5px #00000066;
    text-shadow:2px 2px 2px black;
    transition:top 0.5s ease;
`;

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedId: null,
            notes: [],
            showEditModal: false,
            editNote: {},
            showRegister: false,
            notifyColor: "",
            notifyTopPos: -100,
            notifyText: ""
        };
    }

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
                    if (res.status === 204) {
                        this.setState({ notes });
                        this.successNotification('Usunięto notatkę')
                    }
                })
                .catch((error) => {
                    this.failureNotification('Błąd, nie usunięto notatki :(');
                });
        } catch (error) {
            this.failureNotification('Błąd, nie usunięto notatki :(');
        }

    };
    async addNote(note) {
        if (note.title === "" || note.body === "") {
            return this.failureNotification("Notatka musi zawierać tytuł i opis!");
        }
        if (note.title.length > 100 || note.body.length > 2000) {
            return this.failureNotification("Tytuł notatki nie może być dłuższy niż 100 znaków a treść dłuższa niż 2000 znaków!");
        }
        const notes = [...this.state.notes];
        try {
            const res = await Axios.post(`${baseUrl}/notes`, {
                title: note.title,
                body: note.body,
                owner: this.state.loggedId,
            });
            if (res.data.error) {
                return this.failureNotification("Nie udało się dodać notatki :(");
            }
            const newNoteId = res.data.insertId;
            notes.push({ id: newNoteId, title: note.title, body: note.body });
            this.setState({ notes });
            this.successNotification("Notatka dodana");
        }
        catch (error) {
            return this.failureNotification("Nie udało się dodać notatki :(");
        }
    }
    editNote(note) {
        if (note.title === "" || note.body === "") {
            return this.failureNotification("Notatka musi zawierać tytuł i opis!");
        }
        if (note.title.length > 100 || note.body.length > 2000) {
            return this.failureNotification("Tytuł notatki nie może być dłuższy niż 100 znaków a treść dłuższa niż 2000 znaków!");
        }
        try {
            Axios.put(`${baseUrl}/notes/${note.id}`, {
                login: this.state.loggedId,
                id: note.id,
                title: note.title,
                body: note.body,
            }).then((res) => {
                if (res.status === 204) {
                    this.successNotification("Notatka zaktualizowana");
                    const notes = [...this.state.notes];
                    const index = notes.findIndex(item => item.id === note.id);
                    if (index >= 0) {
                        notes[index] = note;
                        this.setState({ notes });
                    }
                }
            }).catch((error) => {
                return this.failureNotification("Nie udało się zaktualizować notatki :(");
            })
        } catch (error) {
            return this.failureNotification("Nie udało się zaktualizować notatki :(");
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
            if (res.status === 400) {
                return this.failureNotification("Nie udało się pobrać notatek");
            }
            if (res.data.message) {
                return this.successNotification("Brak notatek do pobrania");
            }
            this.setState({ notes: res.data })
        });
    };
    async onLogin(res) {
        (res).then((returnedVal) => {
            this.setState({ notes: [] })
            if (returnedVal.id == null) {
                return this.failureNotification(returnedVal.text);
            }
            this.setState({ loggedId: returnedVal.id });
            this.getNotesFromApi();
            this.successNotification(returnedVal.text);
        })
    }
    logoutUser = () => {
        this.setState({
            loggedId: null,
            notes: [],
        }, () => {
            this.successNotification("Wylogowano");
        })
    }
    toggleRegisterForm = () => {
        this.setState({
            showRegister: !this.state.showRegister
        })
    }
    showNotification = () => {
        this.setState({
            notifyTopPos: 20,
        }, () => {
            setTimeout(() => {
                this.setState({
                    notifyTopPos: -100,
                })
            }, 2000);
        })
    };
    failureNotification = (text) => {
        this.setState({
            notifyColor: "#b1200f",
            notifyText: text
        }, () => {
            this.showNotification();
        })
    };
    successNotification = (text) => {
        this.setState({
            notifyColor: "#77e053",
            notifyText: text
        }, () => {
            this.showNotification();
        })
    };
    render() {
        return (
            <Wrapper>
                <NotifyContainer
                    top={this.state.notifyTopPos}
                    col={this.state.notifyColor}
                >
                    {this.state.notifyText}
                </NotifyContainer>
                {this.state.loggedId == null &&
                    <LogSectionWrapper>
                        {!this.state.showRegister && <Login
                            setLoggedId={(id) => this.onLogin(id)}
                            showRegisterForm={() => this.toggleRegisterForm()}>
                        </Login>}
                        {this.state.showRegister &&
                            <Register
                                hideRegisterForm={() => this.toggleRegisterForm()}
                                succNot={(text) => this.successNotification(text)}
                                failNot={(text) => this.failureNotification(text)}
                            />}
                    </LogSectionWrapper>}
                {this.state.loggedId != null &&
                    <NotesSectionWrapper>
                        <LogoutButton onClick={this.logoutUser}>Wyloguj</LogoutButton>
                        <NewNote
                            onAdd={(note) => this.addNote(note)} />
                        <H1>Twoje notatki:</H1>
                        <StyledModal
                            isOpen={this.state.showEditModal}
                            contentLabel="Edytuj notatkę"
                            ariaHideApp={false}
                        >
                            <EditNote onEdit={(note) => this.editNote(note)}
                                title={this.state.editNote.title}
                                body={this.state.editNote.body}
                                id={this.state.editNote.id}
                                hideModal={() => this.toggleModal()}
                            />
                        </StyledModal>
                        <NotesContainer>
                            {this.state.notes.map((note) => (
                                <Note key={note.id}
                                    title={note.title}
                                    body={note.body}
                                    id={note.id}
                                    onDelete={(id) => this.deleteNote(id)}
                                    onEdit={(note) => this.editNoteHandler(note)} />
                            ))}
                        </NotesContainer>
                    </NotesSectionWrapper>}
            </Wrapper>
        );
    }
}
export default Todo;
