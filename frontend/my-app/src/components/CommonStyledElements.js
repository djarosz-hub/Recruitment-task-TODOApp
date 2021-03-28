import styled from "styled-components";
export const Wrapper = styled.div`
    border-radius: 5px;
    padding:20px;
    border: 1px solid #FFC300;
    display:flex;
`;
export const Button = styled.button`
    width:fit-content;
    height:35px;
    color:white;
`;
export const EditButton = styled(Button)`
    background-color:blue;
`;

export const DeleteButton = styled(Button)`
    background-color:red;
`;

export const AddButton = styled(Button)`
    background-color:greenyellow;
`;
export const RegButton = styled(Button)`
    background-color:purple;
`;
export const Input = styled.input`
    padding: 5px 5px;
    margin: 8px 0;
`;
export const Header = styled.p`
    font-size:30px;
    color:gray;
`;
export const Label = styled.label`
    display:block;
`;