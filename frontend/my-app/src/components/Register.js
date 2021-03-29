import React from "react";
import styled from "styled-components";
import { Wrapper, Input, Label, AuthButton, Header, LoginButtonsWrapper, BackButton } from "./styledElements/CommonStyledElements";
import { emptyCredentialsAlert, baseUrl } from "./Todo";
import Axios from "axios";

const WrapperReg = styled(Wrapper)`
    background: linear-gradient(#084081,#2b8cbe,#2b8cbe);
    width:300px;
    height:250px;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

const registerUser = () => {
    const login = document.getElementById("regLogin");
    const pass = document.getElementById("regPass");
    if (!validateInput(login.value, pass.value)) {
        cleanInputs(login, pass);
        return emptyCredentialsAlert();
    }
    try {
        Axios.post(`${baseUrl}/register`, {
            login: login.value,
            password: pass.value,
        }).then((res) => {
            console.log(res);
            if (res.data.error) {
                return failedRegister(res.data.error);
            }
            successfullRegister();
            cleanInputs(login, pass);
        });
    } catch (err) {
        return failedRegister(err);
    }
};
function validateInput(login, pass) {
    if (login === "" || pass === "" || login.length > 30 || pass.length > 30)
        return false;
    return true;
}
//todo
function successfullRegister() {
    alert("successfully registered user")
}
//todo
function failedRegister(error) {
    alert(`failed to register: ${error}`)
}
function cleanInputs(login, pass) {
    login.value = "";
    pass.value = "";
}
function Register(props) {
    return (
        <WrapperReg>
            <Header>Rejestracja:</Header>
            <form>
                <Label>Login:</Label>
                <Input type="text" id="regLogin" placeholder="login" maxLength="30"></Input>
                <Label>Hasło:</Label>
                <Input type="text" id="regPass" placeholder="hasło" maxLength="30"></Input>
            </form>
            <LoginButtonsWrapper>
                <AuthButton onClick={registerUser}>Zarejestruj</AuthButton>
                <BackButton onClick={props.hideRegisterForm}>Powrót</BackButton>
            </LoginButtonsWrapper>
        </WrapperReg>
    );
}
export default Register;