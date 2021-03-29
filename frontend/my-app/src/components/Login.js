import React from "react";
import styled from "styled-components";
import { Wrapper, Input, Label, AuthButton, Header, LoginButtonsWrapper } from "./styledElements/CommonStyledElements";
import { baseUrl } from "./Todo";
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
        return {
            id: null,
            text: "Login ani hasło nie mogą być puste ani nie mogą być dluższe niż 30 znaków"
        }
    }
    try {
        const res = await Axios.post(`${baseUrl}/login`, {
            login: login.value,
            password: pass.value,
        });
        if (res.data.error) {
            return {
                id: null,
                text: "Nie udało się zalogować"
            };
        }
        if (res.data.message) {
            return {
                id: null,
                text: "Błędny login lub hasło"
            };
        }
        cleanInputs(login, pass);
        return {
            id: res.data[0].id,
            text: "Zalogowano"
        };
    } catch (err) {
        return {
            id: null,
            text: "Nie udało się zalogować"
        };
    }
}
function validateInput(login, pass) {
    if (login === "" || pass === "" || login.length > 30 || pass.length > 30)
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