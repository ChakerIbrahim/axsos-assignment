import React, { useState } from "react";

const UserForm = (props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const createUser = (e) => {
        e.preventDefault();

        const newUser = { username, email , password };
        console.log("Welcome", newUser)

        setUsername("");
        setEmail("");
        setPassword("");
    };
    return (
        <form onSubmit={ createUser}>
            <div>
                <label>Username:</label>
                <input type="text"value={username} onChange={ (e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Email Address:</label>
                <input type="text" value={email} onChange={ (e) => setEmail(e.target.value)}/>
            </div>

            <div>
                <label>Password:</label>
                <input type="text" value={password} onChange={ (e) => setPassword(e.target.value)} />
            </div>
                <input type="submit" value="Create User" />
        </form>
    );
};
export default UserForm;


const UserForm = (props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);

    const createUser = (e) => {
        e.preventDefault();

        const newUser = { username, email,password};
        console.log("Welcome", newUser);
        setUsername("");
        setEmail("");
        setPassword("");

        setHasBeenSubmitted(true);
    };

    const formMessage = () => {
        if(hasBeenSubmitted) {
            return "Thank you for submitting the form!";
        }else {
            return "Welcome, please submit the form";
        }
    };

    return (
        <form onSubmit={createUser}>
            <h3>{formMessage()}</h3>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={ (e)=> setUsername(e.target.value)}/>
            </div>
            <div>
                <label>Email Address:</label>
                <input type="text" value={email} onChange={ (e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="text" value={password} onChange={ (e) => setPassword(e.target.value)} />
            </div>
            <input type="submit" value="Create User"/>
        </form>
    );
};
export default UserForm;

<form onSubmit={createUser}>
    {
        hasBeenSubmitted ?
        <h3>Thank you for submitting the form!</h3> :
        <h3>Welcome , please submit the form.</h3>
    }
    <div>
        <label>Username:</label>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
    </div>
</form>