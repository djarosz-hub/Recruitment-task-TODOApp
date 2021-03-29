import React, { useState } from "react";
import styled from "styled-components";
import {Button, AddButton, Input, Label, Wrapper}from "./styledElements/CommonStyledElements";

const WrapperNewNote = styled(Wrapper)`
    background: linear-gradient(#2b8cbe,#084081);
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;
const InputNote = styled(Input)`
    width:500px;
`;

export const ShowFormBtn = styled(Button)`
    background-color:#447733;
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
    <WrapperNewNote>
      <Label>Tytuł notatki:</Label>
      <InputNote type="text" value={title} onChange={changeTitleHandler} maxLength="100"/>

      <Label>Treść:</Label>
      <InputNote type="text" value={body} onChange={changeBodyHandler} maxLength="2000"/>
      <AddButton onClick={() => addNote()}>Dodaj notatkę</AddButton>
    </WrapperNewNote>
      ) : (
        <ShowFormBtn onClick={()=>setShowAddForm(true)}>Dodaj notatkę</ShowFormBtn>
      )
  );
}
export default NewNote;
