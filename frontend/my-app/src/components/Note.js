import React from "react";
import styled from "styled-components";
import {DeleteButton, EditButton} from "./CommonStyledElements";

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
            <EditButton onClick={editHandler}>Edytuj notatkę</EditButton>
            <DeleteButton onClick={() => props.onDelete(props.id)}>Usuń notatkę</DeleteButton>
        </Wrapper >
    );
}
export default Note;