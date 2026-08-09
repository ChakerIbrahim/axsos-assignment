import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/* -------------------------------------------------------------
   The add form. It holds its own inputs, checks them as you
   type, and hands the finished player UP to the parent.
------------------------------------------------------------- */
const PlayerForm = (props) => {

    const { onSubmitProp, errors } = props;

    // the two input values
    const [name, setName] = useState("");
    const [preferredPosition, setPreferredPosition] = useState("");

    // BONUS: frontend validation. "" means show nothing.
    const [nameError, setNameError] = useState("");
    const [positionError, setPositionError] = useState("");

    const handleName = (e) => {
        setName(e.target.value);

        // check e.target.value, NOT name — the setter is async,
        // so `name` still holds the previous keystroke here
        if (e.target.value.length === 0) {
            // nothing typed yet, so don't nag
            setNameError("");
        } else if (e.target.value.length < 3) {
            setNameError("Player name must be at least 3 characters");
        } else {
            setNameError("");
        }
    };

    const handlePosition = (e) => {
        setPreferredPosition(e.target.value);

        if (e.target.value === "") {
            setPositionError("Preferred position is required");
        } else {
            setPositionError("");
        }
    };

    const handleSubmit = (e) => {
        // stop the browser reloading the page
        e.preventDefault();

        // last check before sending — catches a completely
        // untouched form, where no onChange ever fired
        if (name.length < 3) {
            setNameError("Player name must be at least 3 characters");
            return;   // stops the function here, nothing is sent
        }
        if (preferredPosition === "") {
            setPositionError("Preferred position is required");
            return;
        }

        // hand the data up and let the parent decide what to do
        onSubmitProp({ name, preferredPosition });
    };

    return (
        <form onSubmit={ handleSubmit } className="player-form">

            {/* errors the SERVER sent back */}
            { errors.map( (err, i) =>
                <p key={ i } className="error">{ err }</p>
            ) }

            <label>Player Name:</label>
            {/* controlled input: value comes FROM state,
                onChange writes back INTO state */}
            <input type="text" value={ name } onChange={ handleName } />
            {/* only renders when the string has text — "" is falsy */}
            { nameError ? <p className="error">{ nameError }</p> : "" }

            <label>Preferred Position:</label>
            {/* a select is controlled too. It starts as "" and has a
                blank option, so there's always a valid selection. */}
            <select value={ preferredPosition } onChange={ handlePosition }>
                <option value="">Choose a position</option>
                <option value="Pitcher">Pitcher</option>
                <option value="Catcher">Catcher</option>
                <option value="First Base">First Base</option>
                <option value="Second Base">Second Base</option>
                <option value="Shortstop">Shortstop</option>
                <option value="Outfield">Outfield</option>
            </select>
            { positionError ? <p className="error">{ positionError }</p> : "" }

            <div className="form-buttons">
                {/* Link changes the URL without reloading the page */}
                <Link to="/">Cancel</Link>
                <input type="submit" value="Add" />
            </div>
        </form>
    );
};

export default PlayerForm;