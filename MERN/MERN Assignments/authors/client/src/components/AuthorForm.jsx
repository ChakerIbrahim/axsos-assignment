import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/* -------------------------------------------------------------
   ONE form, used by BOTH the add page and the edit page.
   The pages differ only in what they pass down:
     initialName   — blank for add, the current name for edit
     onSubmitProp  — a function that POSTs or PATCHes
     errors        — the messages the server sent back
------------------------------------------------------------- */
const AuthorForm = (props) => {

    // destructure the props into local variables
    const { initialName, onSubmitProp, errors } = props;

    // the input's value. It starts as whatever the parent gave us,
    // which is how the edit form arrives pre-filled.
    const [name, setName] = useState(initialName);

    const handleSubmit = (e) => {
        // stop the browser reloading the page
        e.preventDefault();

        // hand the data up to the parent and let IT decide
        // whether that means create or update
        onSubmitProp({ name });
    };

    return (
        <form onSubmit={ handleSubmit } className="author-form">

            {/* every error the server sent, one paragraph each */}
            { errors.map( (err, i) =>
                <p key={ i } className="error">{ err }</p>
            ) }

            <label>Name:</label>
            {/* controlled input: value comes FROM state,
                onChange writes back INTO state */}
            <input
                type="text"
                value={ name }
                onChange={ (e) => setName(e.target.value) }
            />

            <div className="form-buttons">
                {/* Link changes the URL without reloading the page */}
                <Link to="/">Cancel</Link>
                <input type="submit" value="Submit" />
            </div>
        </form>
    );
};

export default AuthorForm;