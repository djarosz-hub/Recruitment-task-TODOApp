import React from "react";
import styled from "styled-components";

const Container = styled.div`
    background-color:${props=>props.bgcol};
    color:white;
    padding:16px;
    position:absolute;
    top:${props => props.top}px;
    right:20px;
    z-index:999;
    transition:top 0.5s ease;
`;
export default class Notifications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            top: -100,
            text: "",
            bgcol: "",
        }
    }
    // changeCol=(col)=>{
    //     this.setState({
    //         bgcol:col
    //     });
    // };
    showNotification = (msg,col) => {
        console.log(`from s ${msg}`)
        console.log(`from s ${col}`)
        this.setState({
            top: 20,
            text: msg,
            bgcol:col
        }).then(() => {
            console.log(this.state.text)
            console.log(this.state.bgcol)
            setTimeout(() => {
                this.setState({
                    top: -100,
                })
            }, 2000);
        })
    };

    
    render() {
        return (
            <>
                <Container top={this.state.top} 
                background-color={this.state.bgcol}
                >{this.state.text}</Container>
            </>
        );
    }
}
