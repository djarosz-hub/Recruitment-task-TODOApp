import React from "react";
import styled from "styled-components";
import Note from "./Note";
import NewNote from "./NewNote";
import Modal from "react-modal";
import EditNote from "./EditNote";
import Axios from "axios";
function emptyCredentialsAlert() {
    alert("Username or password can't be empty!");
}
function emptyNoteAlert() {
    alert("Note title or note body can't be empty!");
}
class Todo extends React.Component {
    state = {
        notes: [],
        showEditModal: false,
        editNote: {}
    };
    deleteNote(id) {
        console.log(id);
        const notes = [...this.state.notes].filter(note => note.id !== id);
        this.setState({ notes });
    };
    async addNote(note) {
        if (note.title === "" || note.body === "") {
            return emptyNoteAlert();
        }
        const notes = [...this.state.notes];
        //todo edit
        const res = await Axios.post("http://localhost:3001/notes", {
            title: note.title,
            body: note.body,
            // owner: loggedId,
            owner:1
          });
          if(res.data.error){
              return console.log(`error adding note: ${res.data.error}`)
            }
        const newNoteId = res.data.insertId;
        //
        notes.push({id: newNoteId, title: note.title, body: note.body });
        this.setState({ notes });
    }
    editNote(note) {
        const notes = [...this.state.notes];
        const index = notes.findIndex(item => item.id === note.id);
        if (index >= 0) {
            notes[index] = note;
            this.setState({ notes });
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
    // todo
    componentDidMount() {
        this.getNotesFromApi();
    }
    //
    getNotesFromApi() {
        Axios.get("http://localhost:3001/notes", {
            params: {
                //todo login: loggedId,
                login: 1
            },
        }).then((res) => {
            if (res.message) {
                console.log(res.message.data);
                return;
            }
            this.setState({ notes: res.data })
            console.log(res.data);
        });
    };

    render() {
        return (
            <>
                <NewNote
                    onAdd={(note) => this.addNote(note)} />
                <Modal
                    isOpen={this.state.showEditModal}
                    contentLabel="Edytuj notatkę"
                    ariaHideApp={false}>
                    <EditNote onEdit={(note) => this.editNote(note)}
                        title={this.state.editNote.title}
                        body={this.state.editNote.body}
                        id={this.state.editNote.id} />
                    <button onClick={() => this.toggleModal()}>Anuluj</button>
                </Modal>
                {this.state.notes.map((note) => (
                    <Note key={note.id}
                        title={note.title}
                        body={note.body}
                        id={note.id}
                        onDelete={(id) => this.deleteNote(id)}
                        onEdit={(note) => this.editNoteHandler(note)} />
                ))};
            </>
        );
    }
}
export default Todo;
