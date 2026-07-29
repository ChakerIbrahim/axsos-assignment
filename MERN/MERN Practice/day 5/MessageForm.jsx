import React, { useState } from "react";

const MessageForm = (props) => {
    const [msg, setMsg] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onnewMessage(msg);
    };

    return (
        <form onSubmit={ handleSubmit}>
            <textarea
            rows="4"
            cols="50"
            placeholder="Enter your message here"
            onChange={(e)=> setMsg(e.target.value)}
            value={msg}
            ></textarea>
            <input type="submit" value="Send Message" />
        </form>
    )
}
export default MessageForm;