import React, { useState } from 'react';

// BoxForm owns only the form's own inputs.
// The finished box gets handed up to App.
const BoxForm = (props) => {

    // controlled input values — these belong to the form, not the app
    const [color, setColor] = useState("");
    const [size, setSize] = useState("100");   // sensible starting size

    // error message for the color field ("" means show nothing)
    const [colorError, setColorError] = useState("");

    // fires on every keystroke in the color box
    const handleColor = (e) => {
        setColor(e.target.value);

        // clear the error as soon as the user starts typing
        setColorError("");
    };

    // fires on every change of the size box
    const handleSize = (e) => {
        setSize(e.target.value);
    };

    const handleSubmit = (e) => {
        // stop the browser reloading the page and wiping our state
        e.preventDefault();

        if (color.length === 0) {
            // nothing typed — refuse to add and explain why
            setColorError("Please enter a color");
        } else {
            // ES6 shorthand: { color: color, size: size } becomes { color, size }
            const newBox = { color, size };

            // THIS is the lift: call the parent's function and
            // pass the new box up as the parameter
            props.onNewBox( newBox );

            // NINJA BONUS: clear the inputs after a successful add
            setColor("");
            setSize("100");
            setColorError("");
        }
    };

    return (
        <form onSubmit={ handleSubmit } className="box-form">

            <label>Color: </label>
            {/* controlled input: value comes FROM state,
                onChange writes back INTO state */}
            <input type="text" value={ color } onChange={ handleColor } />

            <label>Size: </label>
            {/* NINJA BONUS: the second input, controlling width and height */}
            <input type="number" value={ size } onChange={ handleSize } />

            <input type="submit" value="Add" />

            {/* only renders when colorError holds text — "" is falsy */}
            { colorError ? <p className="error">{ colorError }</p> : "" }
        </form>
    );
};

export default BoxForm;