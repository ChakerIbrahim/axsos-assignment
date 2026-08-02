import React, { useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoDisplay from './components/TodoDisplay';

// App is the shared parent of the form and the list.
// It holds the tasks so both children work with the same data.
function App() {

    /* ---------------------------------------------------------
       THE LIFTED STATE
       The array of tasks lives here, in the parent. Each task is
       an object: { text: "...", complete: false }
       It starts empty — no tasks on first render.
    --------------------------------------------------------- */
    const [tasks, setTasks] = useState([]);

    /* ---------------------------------------------------------
       ADD — passed DOWN to TodoForm
       The child calls this and hands the new task text up.
    --------------------------------------------------------- */
    const addTask = (taskText) => {
        // every new task starts as not completed
        const newTask = { text: taskText, complete: false };

        // spread copies the existing tasks into a NEW array,
        // then the new task is added on the end.
        // We never push into the old array — we replace it.
        setTasks([ ...tasks, newTask ]);
    };

    /* ---------------------------------------------------------
       DELETE — passed DOWN to TodoDisplay
       filter returns a NEW array containing only the tasks
       whose position is NOT the one we're removing.
    --------------------------------------------------------- */
    const deleteTask = (indexToDelete) => {
        setTasks( tasks.filter( (task, i) => i !== indexToDelete ) );
    };

    /* ---------------------------------------------------------
       TOGGLE — passed DOWN to TodoDisplay
       NINJA BONUS: nothing is mutated. map builds a new array,
       and the one task we're changing becomes a new object too.
    --------------------------------------------------------- */
    const toggleTask = (indexToToggle) => {
        setTasks(
            tasks.map( (task, i) => {
                if (i === indexToToggle) {
                    // copy the task, then flip complete to its opposite
                    return { ...task, complete: !task.complete };
                } else {
                    // every other task is passed through untouched
                    return task;
                }
            })
        );
    };

    return (
        <div className="App">
            <h1>Todo List</h1>

            {/* send the add function DOWN so the form can call it */}
            <TodoForm onNewTask={ addTask } />

            {/* send the data AND the two functions DOWN */}
            <TodoDisplay
                tasks={ tasks }
                onDelete={ deleteTask }
                onToggle={ toggleTask }
            />
        </div>
    );
}

export default App;