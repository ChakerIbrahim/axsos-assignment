import React, { useState } from 'react';

// UserForm holds the entire form: the inputs, the validation, and the live display.
const UserForm = (props) => {

    /* ---------------------------------------------------------
       STATE FOR THE INPUT VALUES
       One piece of state per input. Each starts as an empty
       string because each input starts blank on the page.
    --------------------------------------------------------- */
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    /* ---------------------------------------------------------
       STATE FOR THE ERROR MESSAGES
       One piece of state per input again. An empty string means
       "no error to show" — empty strings are falsy in JavaScript,
       which is what makes the conditional rendering below work.
    --------------------------------------------------------- */
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    // Tracks whether the form has been submitted, so the heading can change.
    const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);

    /* ---------------------------------------------------------
       HANDLERS
       Each handler does two jobs on every single keystroke:
       1. save what was typed into state
       2. check that value against the rule and set/clear the error
    --------------------------------------------------------- */

    const handleFirstName = (e) => {
        // e.target is the input element; e.target.value is what's inside it
        setFirstName(e.target.value);

        if (e.target.value.length === 0) {
            // SENSEI BONUS: field is blank, so show no error at all
            setFirstNameError("");
        } else if (e.target.value.length < 2) {
            // something was typed, but it's too short
            setFirstNameError("First Name must be at least 2 characters");
        } else {
            // rule passed, so wipe any error that was showing
            setFirstNameError("");
        }
    };

    const handleLastName = (e) => {
        setLastName(e.target.value);

        if (e.target.value.length === 0) {
            setLastNameError("");
        } else if (e.target.value.length < 2) {
            setLastNameError("Last Name must be at least 2 characters");
        } else {
            setLastNameError("");
        }
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);

        if (e.target.value.length === 0) {
            setEmailError("");
        } else if (e.target.value.length < 5) {
            setEmailError("Email must be at least 5 characters");
        } else {
            setEmailError("");
        }
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);

        // RULE 1 — the password's own length
        if (e.target.value.length === 0) {
            setPasswordError("");
        } else if (e.target.value.length < 8) {
            setPasswordError("Password must be at least 8 characters");
        } else {
            setPasswordError("");
        }

        // RULE 2 — the match must be re-checked, because the password
        // just changed and the confirm field may no longer agree with it
        if (confirmPassword.length === 0) {
            setConfirmPasswordError("");
        } else if (e.target.value !== confirmPassword) {
            setConfirmPasswordError("Passwords must match");
        } else {
            setConfirmPasswordError("");
        }
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);

        if (e.target.value.length === 0) {
            setConfirmPasswordError("");
        } else if (e.target.value !== password) {
            setConfirmPasswordError("Passwords must match");
        } else {
            setConfirmPasswordError("");
        }
    };

    /* ---------------------------------------------------------
       FORM VALIDITY
       Recalculated on every render. Needed separately from the
       error states because a blank field shows no error but is
       still not valid.
    --------------------------------------------------------- */
    const formIsValid =
        firstName.length >= 2 &&
        lastName.length >= 2 &&
        email.length >= 5 &&
        password.length >= 8 &&
        password === confirmPassword;

    /* ---------------------------------------------------------
       SUBMIT
    --------------------------------------------------------- */
    const createUser = (e) => {
        // stops the browser reloading the page and wiping our state
        e.preventDefault();

        // ES6 shorthand: { firstName: firstName } becomes { firstName }
        const newUser = { firstName, lastName, email, password };
        console.log("Welcome", newUser);

        setHasBeenSubmitted(true);

        // clearing the state clears the inputs, because they're controlled
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="form-wrapper">

            {/* Ternary swaps the heading once the form has been submitted */}
            <h2>
                { hasBeenSubmitted
                    ? "Thank you for submitting the form!"
                    : "Welcome, please fill out the form." }
            </h2>

            {/* onSubmit gets the function itself — no parentheses,
                or it would run immediately when the page renders */}
            <form onSubmit={ createUser }>

                <div className="field">
                    <label>First Name: </label>
                    {/* controlled input: value comes FROM state,
                        onChange writes back INTO state */}
                    <input type="text" value={ firstName } onChange={ handleFirstName } />
                    {/* if the error string has text it renders; if it's "" nothing shows */}
                    { firstNameError ? <p className="error">{ firstNameError }</p> : "" }
                </div>

                <div className="field">
                    <label>Last Name: </label>
                    <input type="text" value={ lastName } onChange={ handleLastName } />
                    { lastNameError ? <p className="error">{ lastNameError }</p> : "" }
                </div>

                <div className="field">
                    <label>Email: </label>
                    <input type="text" value={ email } onChange={ handleEmail } />
                    { emailError ? <p className="error">{ emailError }</p> : "" }
                </div>

                <div className="field">
                    <label>Password: </label>
                    {/* type="password" masks the characters on screen */}
                    <input type="password" value={ password } onChange={ handlePassword } />
                    { passwordError ? <p className="error">{ passwordError }</p> : "" }
                </div>

                <div className="field">
                    <label>Confirm Password: </label>
                    <input type="password" value={ confirmPassword } onChange={ handleConfirmPassword } />
                    { confirmPasswordError ? <p className="error">{ confirmPasswordError }</p> : "" }
                </div>

                {/* button stays locked until every rule passes */}
                <input type="submit" value="Create User" disabled={ !formIsValid } />
            </form>

            {/* Live display — reads the same state the inputs write to,
                so it updates on every keystroke with no extra code */}
            <h3>Your Form Data</h3>
            <p>First Name: { firstName }</p>
            <p>Last Name: { lastName }</p>
            <p>Email: { email }</p>
            <p>Password: { password }</p>
            <p>Confirm Password: { confirmPassword }</p>
        </div>
    );
};

// makes the component importable by App.jsx
export default UserForm;