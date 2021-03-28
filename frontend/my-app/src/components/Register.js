import React from "react";
import styled from "styled-components";
import { Wrapper, Input, Label, RegButton, Header } from "./CommonStyledElements";
import { emptyCredentialsAlert, baseUrl } from "./Todo";
import Axios from "axios";

const WrapperReg = styled(Wrapper)`
    width:300px;
    height:200px;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;
const registerUser = () => {
    const login = document.getElementById("regLogin");
    const pass = document.getElementById("regPass");
    if (!validateInput(login.value, pass.value)) {
        cleanInputs(login,pass);
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
            cleanInputs(login,pass);
        });
    } catch (err) {
        return failedRegister(err);
    }
};
function validateInput(login, pass) {
    if (login === "" || pass === "")
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
function cleanInputs(login,pass) {
    login.value = "";
    pass.value = "";
}
function Register() {
    return (
        <WrapperReg>
            <Header>Rejestracja:</Header>
            <form>
                <Label>Login:</Label>
                <Input type="text" id="regLogin" placeholder="login" maxLength="30"></Input>
                <Label>Hasło:</Label>
                <Input type="text" id="regPass" placeholder="hasło" maxLength="30"></Input>
            </form>
            <RegButton onClick={registerUser}>Zarejestruj</RegButton>
        </WrapperReg>
    );
}
export default Register;