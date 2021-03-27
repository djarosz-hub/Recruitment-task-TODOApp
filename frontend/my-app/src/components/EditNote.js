import React, { useState } from "react";
import {Label, Input} from "./NewNote";
import styled from "styled-components";
import {NoteBtn} from "./Note";

const Wrapper = styled.div`
    width:200px;
    height:200px;
`;

function EditNote(props) {
    const [title, setTitle] = useState(props.title);
    const [body, setBody] = useState(props.body);

    const changeTitleHandler = (e) => {
        const val = e.target.value;
        setTitle(val);
    };
    const changeBodyHandler = (e) => {
        const val = e.target.value;
        setBody(val);
    };
    const editNote = () => {
        const note = {
            title:title,
            body:body,
            id:props.id
        }
        props.onEdit(note);
    }
    return (

        <Wrapper>
            <Label>Tytuł notatki:</Label>
            <Input type="text" value={title} onChange={changeTitleHandler} />

            <Label>Treść:</Label>
            <Input type="text" value={body} onChange={changeBodyHandler} />
            <NoteBtn onClick={() => editNote()}>Edytuj notatkę</NoteBtn>
        </Wrapper>

    );
}
export default EditNote;