import React from "react";
import './styles.css';

const MyNewComponent = (props) => {
    return(
        <div>
            { props.children}
            <h1>
                {props.header}
            </h1>
        </div>
    );
}

export default MyNewComponent;

const MyButton = (props) => {
    return(
        <button className="btn">
            {props.children}
        </button>
    );
}
export default MyButton;

const btnStyle = {
    padding: '12px 15px',
    fontFamily:'Arial, sans-serif',
    fontWeight:'bold',
    background:'linear-gradient(30deg,rebeccapurple,magenta)',
    color:'#fff',
    border:'none'
};

const MyButton = (props) => {
    return (
        <button style={btnStyle}>
            {props.children}
        </button>
    );
}
export default MyButton;