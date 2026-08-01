import React from 'react';

// BoxDisplay has NO state of its own.
// It just receives the array as a prop and draws it.
const BoxDisplay = (props) => {
    return (
        <div className="box-area">

            {/* if there are no boxes yet, show a message instead */}
            { props.boxes.length === 0
                ? <p>No boxes yet. Add one above.</p>
                : "" }

            {/* map turns each box object into a <div> on the page.
                It returns a NEW array of JSX — the original is untouched. */}
            { props.boxes.map( (box, i) =>
                <div
                    key={ i }
                    className="box"
                    style={{
                        // inline styles: camelCase names, string values
                        backgroundColor: box.color,
                        width: box.size + "px",
                        height: box.size + "px"
                    }}
                ></div>
            ) }
        </div>
    );
};

export default BoxDisplay;