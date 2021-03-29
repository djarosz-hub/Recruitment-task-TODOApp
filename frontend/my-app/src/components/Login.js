import React from "react";
import styled from "styled-components";
import { Wrapper, Input, Label, AuthButton, Header, LoginButtonsWrapper } from "./styledElements/CommonStyledElements";
import { emptyCredentialsAlert, baseUrl } from "./Todo";
import Axios from "axios";

const WrapperLog = styled(Wrapper)`
    background: linear-gradient(#084081,#2b8cbe,#2b8cbe);
    width:300px;
    height:250px;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

async function loginUser() {
    const login = document.getElementById("login");
    const pass = document.getElementById("password");
    if (!validateInput(login.value, pass.value)) {
        cleanInputs(login, pass);
        emptyCredentialsAlert();
        return null;
    }
    try {
        const res = await Axios.post(`${baseUrl}/login`, {
            login: login.value,
            password: pass.value,
        });
        if (res.data.error) {
            console.log("something went wrong");
            return null;
        }
        if (res.data.message) {
            console.log(res.data.message);
            return null;
        }
        cleanInputs(login, pass);
        return (res.data[0].id);
    } catch (err) {
        console.log(err);
        return null;
    }
}
function validateInput(login, pass) {
    if (login === "" || pass === "")
        return false;
    return true;
}
function cleanInputs(login, pass) {
    login.value = "";
    pass.value = "";
}
function Login(props) {
    return (
        <WrapperLog>
            <Header>Logowanie:</Header>
            <form>
                <Label>Login:</Label>
                <Input type="text" id="login" placeholder="login" maxLength="30"></Input>
                <Label>Hasło:</Label>
                <Input type="text" id="password" placeholder="hasło" maxLength="30"></Input>
            </form>
            <LoginButtonsWrapper>
                <AuthButton onClick={() => props.setLoggedId(loginUser())}>Zaloguj</AuthButton>
                <AuthButton onClick={() => props.showRegisterForm()}>Rejestracja</AuthButton>
            </LoginButtonsWrapper>
        </WrapperLog>
    );
}
export default Login;