import React from "react";
import styled from "styled-components";
import Note from "./Note";
import NewNote from "./NewNote";
import Modal from "react-modal";
import EditNote from "./EditNote";

class Todo extends React.Component {
    state = {
        notes: [
            {
                id: "123",
                title: "pierwsza",
                body: "notka1"
            },
            {
                id: "234",
                title: "druga",
                body: "notka2"
            }
        ],
        showEditModal: false,
        editNote:{}
    };
    deleteNote(id) {
        console.log(id);
        const notes = [...this.state.notes].filter(note => note.id !== id);
        this.setState({ notes });
    };
    addNote(note) {
        const notes = [...this.state.notes];
        notes.push(note);
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
        this.setState({editNote:note})
    }
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
                    id={this.state.editNote.id}/>
                    <button onClick={()=>this.toggleModal()}>Anuluj</button>
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
