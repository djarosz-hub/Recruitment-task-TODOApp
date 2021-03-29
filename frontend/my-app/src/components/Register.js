import React from "react";
import styled from "styled-components";
import { Wrapper, Input, Label, AuthButton, Header, LoginButtonsWrapper, BackButton } from "./styledElements/CommonStyledElements";
import { baseUrl } from "./Todo";
import Axios from "axios";

const WrapperReg = styled(Wrapper)`
    background: linear-gradient(#084081,#2b8cbe,#2b8cbe);
    width:300px;
    height:250px;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

function registerUser(success, failure) {
    return function () {
        const login = document.getElementById("regLogin");
        const pass = document.getElementById("regPass");
        if (!validateInput(login.value, pass.value)) {
            cleanInputs(login, pass);
            return failure("Login ani hasło nie mogą być puste ani nie mogą być dluższe niż 30 znaków");
        }
        try {
            Axios.post(`${baseUrl}/register`, {
                login: login.value,
                password: pass.value,
            }).then((res) => {
                if (res.status === 400) {
                    return failure("Błąd rejestracji, nie zarejestrowano użytkownika");
                }
                if (res.status === 200 && res.data.error) {
                    return failure("Podany użytkownik już istnieje");
                }
                cleanInputs(login, pass);
                return success("Zarejestrowano użytkownika")
            });
        } catch (err) {
            return failure("Błąd rejestracji, nie zarejestrowano użytkownika");
        }
    };
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
                <AuthButton onClick={registerUser(props.succNot, props.failNot)}>Zarejestruj</AuthButton>
                <BackButton onClick={props.hideRegisterForm}>Powrót</BackButton>
            </LoginButtonsWrapper>
        </WrapperReg>
    );
}
export default Register;