import React, { useState } from 'react';
// useNavigate changes the URL from code, rather than
// from a link the user clicks
import { useNavigate } from 'react-router-dom';

const SearchForm = (props) => {

    // the dropdown's value. It starts as "people" and NOT as ""
    // so the select always has a valid selection.
    const [resource, setResource] = useState("people");

    // the ID typed into the number box
    const [id, setId] = useState("");

    // error message ("" means show nothing)
    const [formError, setFormError] = useState("");

    // gives us a function we can call to change the URL
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        // stop the browser reloading the page
        e.preventDefault();

        if (id === "") {
            setFormError("Please enter an ID number");
        } else {
            setFormError("");

            // build the path from the two inputs and go there.
            // This matches the "/:resource/:id" Route in App.jsx,
            // so the Detail component takes over from here.
            navigate(`/${resource}/${id}`);
        }
    };

    return (
        <form onSubmit={ handleSubmit } className="search-form">

            {/* a select is a controlled input too — it needs
                value and onChange, just like a text box */}
            <select value={ resource } onChange={ (e) => setResource(e.target.value) }>
                <option value="people">People</option>
                <option value="planets">Planets</option>
            </select>

            <label htmlFor="id-input">ID:</label>
            <input
                id="id-input"
                type="number"
                value={ id }
                onChange={ (e) => setId(e.target.value) }
            />

            <input type="submit" value="Search" />

            { formError ? <p className="form-error">{ formError }</p> : "" }
        </form>
    );
};

export default SearchForm;