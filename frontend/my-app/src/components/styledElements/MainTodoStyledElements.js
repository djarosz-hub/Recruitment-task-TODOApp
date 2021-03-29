import styled from "styled-components";
import { Button } from "./CommonStyledElements";

export const LogoutButton = styled(Button)`
    background-color:#b1200f;
    width:100px;
    position: absolute;
    top:5px;
    left:5px;
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