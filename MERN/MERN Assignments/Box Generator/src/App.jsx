import React, { useState } from 'react';
import './App.css';
import BoxForm from './components/BoxForm';
import BoxDisplay from './components/BoxDisplay';

// App is the shared parent of BoxForm and BoxDisplay.
// It holds the boxes so BOTH children can work with the same data.
function App() {

    /* ---------------------------------------------------------
       THE LIFTED STATE
       The array of boxes lives here, in the parent, not in the
       form. That's what "lifting state" means: the state sits at
       the closest shared parent of the components that need it.
       It starts as an empty array — no boxes on first render.
    --------------------------------------------------------- */
    const [boxes, setBoxes] = useState([]);

    /* ---------------------------------------------------------
       THE FUNCTION PROP
       This gets passed DOWN to BoxForm. When the form submits,
       the child calls this function and passes the new box UP
       as the parameter.
    --------------------------------------------------------- */
    const addBox = (newBox) => {
        // spread copies the existing boxes into a NEW array,
        // then newBox is added on the end.
        // We never push into the old array — we replace it.
        setBoxes([ ...boxes, newBox ]);
    };

    return (
        <div className="App">
            <h1>Box Generator</h1>

            {/* send the function DOWN so the child can call it */}
            <BoxForm onNewBox={ addBox } />

            {/* send the data DOWN so the child can display it */}
            <BoxDisplay boxes={ boxes } />
        </div>
    );
}

export default App;