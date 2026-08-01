import React from 'react';
import './App.css';
import Tabs from './components/Tabs';

function App() {

    /* ---------------------------------------------------------
       THE DATA
       An array of objects, each with a "label" for the header
       and "content" for what shows when that tab is active.
       The third tab also has an optional "callback" — a function
       that runs when its header is clicked (Ninja Bonus).
    --------------------------------------------------------- */
    const tabData = [
        {
            label: "Tab 1",
            content: "Tab 1 content is showing here."
        },
        {
            label: "Tab 2",
            content: "Tab 2 content is showing here."
        },
        {
            label: "Tab 3",
            content: "Tab 3 content is showing here.",
            // optional — not every tab needs one
            callback: () => console.log("Tab 3 was clicked!")
        }
    ];

    return (
        <div className="App">
            <h1>Tabs</h1>

            {/* the array is passed DOWN as a prop.
                curly braces are required — without them React
                would pass the literal string "tabData" */}
            <Tabs tabs={ tabData } />
        </div>
    );
}

export default App;