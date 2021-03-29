import styled from "styled-components";
import { Button } from "./CommonStyledElements";
import Modal from "react-modal";

export const LogoutButton = styled(Button)`
    background-color:#b1200f;
    width:100px;
    position: absolute;
    top:10px;
    left:10px;
    color:#f5f5f5;
    text-shadow: none;
    font-weight:600;
`;
export const Wrapper = styled.div`
    background: linear-gradient(#0868ac,#084081);
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    width:100%;
    height:100vh;
    background-attachment:fixed;
`;
export const NotesContainer = styled.div`
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
`;
export const LogSectionWrapper = styled.div`
    padding:20px;
    display:flex;
    justify-content:center;
`;
export const NotesSectionWrapper = styled.div`
    padding:10px;
    display:flex;
    align-items:center;
    flex-direction:column;
`;
export const H1 = styled.h1`
    color:#f5f5f5;
    font-size:35px;
    text-shadow:2px 2px 2px black;
    margin: 10px;
`;
export const StyledModal = styled(Modal)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items:center;
  flex-direction:column;
  background-color: rgba(29, 49, 65, 0.8);
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 1.2rem;
  z-index: 999;
`;
StyledModal.displayName = 'StyledModal';