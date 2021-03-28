import styled from "styled-components";

export const Wrapper = styled.div`
    max-width:300px;
    min-width:250px;
    display:inline-block;
    flex-direction:column;
    background-color: #808080;
    color:whitesmoke;
    text-shadow:2px 2px 2px black;
    box-shadow: 0px 0px 7px black;;
    border-radius: 5px;
    margin:10px;
    border:solid black 1px;
    box-sizing:border-box;
`;
export const Body = styled.div`
    font-family: monospace;
    font-size: 18px;
    text-align: center;
    margin:10px auto 10px auto;
    width: 95%;
    height: 110px;
    overflow: auto;
    word-break: break-all;
`;
export const Title = styled.p`
    text-align: center;
    font-size: 20px;
    margin:5px 0px 5px 0px;
    padding:5px;
    border-bottom: solid black 1px;
    box-shadow: 0px 5px 5px #00000066;
    word-break: break-all;
`;
export const BtnWrapper = styled.div`
    width:100%;
    height:60px;
    display:flex;
    flex-direction:row;
    justify-content:space-evenly;
    padding:10px;
    box-sizing:border-box;
    box-shadow: 0px -5px 5px #00000066;
`;