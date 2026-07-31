import { useState } from 'react';

const  Form=(props)=> {
    // These five hold what the user is CURRENTLY typing
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [firstNameError, setFirstNameError] = useState("");
    const[lastName, setLastNameError] = useState("");
    const[emailError, setEmailError] = useState("");
    const[passwordError, setPasswordError] = useState("");
    const[confirmPasswordError, setConfirmPasswordError] = useState("");

    const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);

    const handleFirstName(e.target.value);

    if(e.target.value.length === 0) {
        setFirstNameError("");
    }else if(e.target.length < 2) {
        setFirstNameError("First Name must be at least 2 charcters");
    }else{
        setFirstNameError("");
    }
};

const handleLastName = (e) => {
    setLastName(e.target.value);

    if(e.target.value === 0) {
        setLastNameError("");
    }else if (e.target.value.length<2) {
        setLastNameError("Last Name must be at least 2 characters");
    }else {
        setLastNameError("");
    }
};

const handleEmail = (e) => {
    setEmail(e.target.value);

    if(e.target.value.length === 0) {
        setEmailError("");
    }else if(e.target.value<5) {
        setEmailError("Email must be at least 5 characters");
    }else {
        setEmailError("");
    }
};

const handlePassword = (e) => {
    setPassword(e.target.value);

    if(e.target.value.length==0){
        setPasswordError("");
    }else if(e.target.value.length<8) {
        setPasswordError("Password must be at least 8 characters");
    }else{
        setPasswordError("");
    }

    if(confirmPassword.length === 0) {
        setConfirmPasswordError("");
    }else if(e.target.value !== confirmPassword) {
        setConfirmPasswordError("Passwords must match");
    }else {
        setConfirmPasswordError("");
    }
};

const handleConfirmPassword = (e)=>{
    setConfirmPassword(e.target.value);

    if(e.target.value.length === 0) {
        setConfirmPasswordError("");
    }else if(e.target.value !== password){
        setConfirmPasswordError("Passwords must match");
    }else{
        setConfirmPasswordError("");
    }
};

const formIsValid = 
    firstName.length >=2 &&
    lastName.length >=2 &&
    email.length>=5 &&
    password.length>=8 &&
    password === confirmPassword;

    const createUser = (e) => {
        e.preventDefault();

        const newUser = {firstName, lastName, email, password};
        console.log("Welcome", newUser);

        setHasBeenSubmitted(true);

        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    };


    return (
        <div className="form-wrapper">
            <h2>
                {hasBeenSubmitted ? "Thank you for submitting the form!" : "Welcome, please fill out the form."}
            </h2>
        </div>
        <>
            {/* onSubmit fires when the submit button is clicked */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    {firstName.length > 0 && firstName.length<2 && (

                    )}
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>

                {/* type="submit" is what triggers the form's onSubmit */}
                <button type="submit">Submit</button>
            </form>

            {/* Only show this section AFTER the form has been submitted.
                While submittedUser is null, the && returns null and
                React renders nothing at all. */}
            {submittedUser && (
                <div>
                    <h3>Your Form Data</h3>
                    <p>First Name: {submittedUser.firstName}</p>
                    <p>Last Name: {submittedUser.lastName}</p>
                    <p>Email: {submittedUser.email}</p>
                    <p>Password: {submittedUser.password}</p>
                    <p>Confirm Password: {submittedUser.confirmPassword}</p>
                </div>
            )}
        </>
    );
}

export default Form;