import React, { useState } from "react";
import styled from "styled-components";
import {Button, AddButton}from "./CommonStyledElements";

export const Wrapper = styled.div``;
export const Label = styled.label``;
export const Input = styled.input``;
export const ShowFormBtn = styled(Button)`
    background-color:green;
`;
function NewNote(props) {

  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const changeTitleHandler = (e) => {
    const val = e.target.value;
    setTitle(val);
  };
  const changeBodyHandler = (e) => {
    const val = e.target.value;
    setBody(val);
  };
  const addNote = () => {
    const note = {
      title: title,
      body: body
    };
    props.onAdd(note);
    setTitle('');
    setBody('');
    setShowAddForm(!showAddForm);
  };
  return (
      showAddForm ? (
    <Wrapper>
      <Label>Tytuł notatki:</Label>
      <Input type="text" value={title} onChange={changeTitleHandler} />

      <Label>Treść:</Label>
      <Input type="text" value={body} onChange={changeBodyHandler} />
      <AddButton onClick={() => addNote()}>Dodaj notatkę</AddButton>
    </Wrapper>
      ) : (
        <ShowFormBtn onClick={()=>setShowAddForm(true)}>Dodaj notatkę</ShowFormBtn>
      )
  );
}
export default NewNote;
