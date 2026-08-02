import React, { useState } from 'react';

// TodoForm owns only its own input.
// The finished text gets handed up to App.
const TodoForm = (props) => {

    // controlled input value — belongs to the form, not the app
    const [taskText, setTaskText] = useState("");

    // error message ("" means show nothing)
    const [taskError, setTaskError] = useState("");

    // fires on every keystroke
    const handleChange = (e) => {
        setTaskText(e.target.value);

        // clear the error as soon as the user starts typing
        setTaskError("");
    };

    const handleSubmit = (e) => {
        // stop the browser reloading the page and wiping our tasks
        e.preventDefault();

        if (taskText.length === 0) {
            // nothing typed — refuse to add and explain why
            setTaskError("Please enter a task");
        } else {
            // THIS is the lift: call the parent's function and
            // pass the text up as the parameter
            props.onNewTask( taskText );

            // clear the input, ready for the next task
            setTaskText("");
        }
    };

    return (
        <form onSubmit={ handleSubmit } className="todo-form">

            {/* controlled input: value comes FROM state,
                onChange writes back INTO state */}
            <input
                type="text"
                value={ taskText }
                onChange={ handleChange }
                placeholder="Get MERN black belt."
            />

            <input type="submit" value="Add" />

            {/* only renders when taskError holds text — "" is falsy */}
            { taskError ? <p className="error">{ taskError }</p> : "" }
        </form>
    );
};

export default TodoForm;