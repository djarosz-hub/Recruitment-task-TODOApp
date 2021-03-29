import React, { useState } from "react";
import { EditButton, BackButton, Input} from "./styledElements/CommonStyledElements";
import {Wrapper,ModalLabel,BtnWrapper} from "./styledElements/EditStyledElements";

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
            title: title,
            body: body,
            id: props.id
        }
        props.onEdit(note);
    }
    return (
        <Wrapper>
            <ModalLabel>Tytuł notatki:</ModalLabel>
            <Input type="text" value={title} onChange={changeTitleHandler} maxLength="100" />

            <ModalLabel>Treść:</ModalLabel>
            <Input type="text" value={body} onChange={changeBodyHandler} maxLength="2000" />
            <BtnWrapper>
                <EditButton onClick={() => editNote()}>Edytuj notatkę</EditButton>
                <BackButton onClick={() => props.hideModal()}>Anuluj</BackButton>
            </BtnWrapper>
        </Wrapper>
    );
}
export default EditNote;