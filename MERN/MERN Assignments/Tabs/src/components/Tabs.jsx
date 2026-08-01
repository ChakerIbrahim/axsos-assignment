import React, { useState } from 'react';

// A reusable component: it works with any array of tabs,
// of any length, because nothing about the data is hardcoded.
const Tabs = (props) => {

    /* ---------------------------------------------------------
       THE STATE
       Which tab is currently open, stored as its POSITION in
       the array. Starting at 0 means the first tab is open
       when the page loads.
    --------------------------------------------------------- */
    const [activeIndex, setActiveIndex] = useState(0);

    /* ---------------------------------------------------------
       THE CLICK HANDLER
       Receives the event AND the tab that was clicked, plus its
       index. Without those extra arguments we'd have no way of
       knowing WHICH header the user pressed.
    --------------------------------------------------------- */
    const handleTabClick = (e, tab, i) => {
        // remember the new position — this re-renders the component
        setActiveIndex(i);

        // NINJA BONUS: if this tab was given a callback, run it.
        // Tabs without one are simply skipped.
        if (tab.callback) {
            tab.callback();
        }
    };

    return (
        <div className="tabs-wrapper">

            {/* ---------- the row of headers ---------- */}
            <div className="tab-headers">

                {/* map turns each tab object into a clickable header.
                    It returns a NEW array of JSX, leaving props.tabs untouched. */}
                { props.tabs.map( (tab, i) =>
                    <button
                        key={ i }
                        // ternary: the open tab gets an extra class
                        className={ i === activeIndex ? "tab-header active" : "tab-header" }
                        // the arrow function is what lets us send arguments.
                        // onClick={ handleTabClick } alone would only give us the event.
                        onClick={ (e) => handleTabClick(e, tab, i) }
                    >
                        { tab.label }
                    </button>
                ) }
            </div>

            {/* ---------- the content panel ---------- */}
            {/* changing the key forces React to swap the element out
                rather than edit it, which restarts the CSS animation
                on every tab switch (Ninja Bonus) */}
            <div className="tab-content" key={ activeIndex }>
                { props.tabs[ activeIndex ].content }
            </div>
        </div>
    );
};

export default Tabs;