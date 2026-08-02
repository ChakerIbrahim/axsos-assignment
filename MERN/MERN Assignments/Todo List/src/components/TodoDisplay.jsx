import React from 'react';

// TodoDisplay has NO state of its own.
// It receives the tasks and the two functions as props.
const TodoDisplay = (props) => {
    return (
        <div className="todo-list">

            {/* if there are no tasks yet, show a message instead */}
            { props.tasks.length === 0
                ? <p>No tasks yet. Add one above.</p>
                : "" }

            {/* map turns each task object into a row on the page.
                It returns a NEW array of JSX — the original is untouched. */}
            { props.tasks.map( (task, i) =>
                <div key={ i } className="todo-row">

                    {/* ternary adds the strikethrough class when complete */}
                    <span className={ task.complete ? "task-text done" : "task-text" }>
                        { task.text }
                    </span>

                    {/* checkboxes use CHECKED, not value.
                        The arrow function lets us send the index along,
                        so the handler knows WHICH task to toggle. */}
                    <input
                        type="checkbox"
                        checked={ task.complete }
                        onChange={ (e) => props.onToggle(i) }
                    />

                    {/* same trick for delete — the index identifies the row */}
                    <button
                        className="delete-btn"
                        onClick={ (e) => props.onDelete(i) }
                    >
                        Delete
                    </button>
                </div>
            ) }
        </div>
    );
};

export default TodoDisplay;