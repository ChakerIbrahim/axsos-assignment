import { useState } from 'react';

function Form() {
    // These five hold what the user is CURRENTLY typing
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // This holds the SUBMITTED data.
    // It starts as null because nothing has been submitted yet.
    // This is the only thing the display reads from.
    const [submittedUser, setSubmittedUser] = useState(null);

    // This function runs when the form is submitted
    const handleSubmit = (e) => {
        // Stops the browser from reloading the page on submit
        e.preventDefault();

        // Save the current values into state.
        // This is the ONLY moment the displayed data changes.
        setSubmittedUser({
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        });
    };

    return (
        <>
            {/* onSubmit fires when the submit button is clicked */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
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