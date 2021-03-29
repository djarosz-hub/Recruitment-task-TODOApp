import styled from "styled-components";
import { Label } from "./CommonStyledElements";
export const Wrapper = styled.div`
    width:200px;
    height:400px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-content:center;
`;
export const ModalLabel = styled(Label)`
    font-size:30px;
    text-align:center;
    color:whitesmoke;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
`;
export const BtnWrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
`;