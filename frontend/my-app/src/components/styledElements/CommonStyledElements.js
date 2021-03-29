import styled from "styled-components";
export const Wrapper = styled.div`
    border-radius: 10px;
    padding:20px;
    border: 1px solid #084081;
    display:flex;
`;
export const Button = styled.button`
    width:fit-content;
    height:40px;
    color:white;
    border-radius:20px;
    border: 1px solid #000000;
    font-weight:500;
    font-size:15px;
    text-shadow:2px 2px 2px black;
`;
export const EditButton = styled(Button)`
    background-color:#4575b4;
`;

export const DeleteButton = styled(Button)`
    background-color:#d73027;
`;

export const AddButton = styled(Button)`
    background-color:#447733;
`;
export const AuthButton = styled(Button)`
    background-color:purple;
    width:100px;
    margin:5px;
`;
export const Input = styled.input`
    padding: 5px 5px;
    margin: 8px 0;
`;
export const Header = styled.p`
    font-size:30px;
    color:whitesmoke;
    margin:5px;
`;
export const Label = styled.label`
    display:block;
    color:whitesmoke;
`;
export const LoginButtonsWrapper = styled.div`
    display:flex;
    flex-direction:column;
`;
export const BackButton = styled(AuthButton)`
background-color:#b1200f;
`;