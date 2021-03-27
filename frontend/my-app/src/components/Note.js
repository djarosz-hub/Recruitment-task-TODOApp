import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    max-width:250px;
    max-height:200px;
    display:flex;
    flex-direction:column;
`;
const Body = styled.div`

`;
const Title = styled.p`

`;
const NoteBtn = styled.button`
    width:fit-content;
    height:35px;
    color:white;
    background-color:blue;
`;
const DelNoteBtn = styled(NoteBtn)`
    background-color:red;
`;
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
            <NoteBtn onClick={editHandler}>Edytuj notatkę</NoteBtn>
            <DelNoteBtn onClick={() => props.onDelete(props.id)}>Usuń notatkę</DelNoteBtn>
        </Wrapper >
    );
}
export default Note;
export { NoteBtn };