import React from "react";
import { Wrapper, Title, Body, BtnWrapper } from "./styledElements/NoteStyledElements";
import { DeleteButton, EditButton } from "./styledElements/CommonStyledElements";

function Note(props) {

    const editHandler = () => {
        props.onEdit({
            title: props.title,
            body: props.body,
            id: props.id
        })
    }
    return (
        <Wrapper>
            <Title>{props.title}</Title>
            <Body>{props.body}</Body>
            <BtnWrapper>
                <EditButton onClick={editHandler}>Edytuj notatkę</EditButton>
                <DeleteButton onClick={() => props.onDelete(props.id)}>Usuń notatkę</DeleteButton>
            </BtnWrapper>
        </Wrapper >
    );
}
export default Note;