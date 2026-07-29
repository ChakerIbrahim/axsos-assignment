// Import useState so this component can store and update its own age
import { useState } from 'react';

// props = the data passed down from App.jsx
function PersonCard(props) {
    // Pull the values out of props so we can use short names below
    const { firstName, lastName, age, hairColor } = props;

    // STATE
    // We start the state at the age that came in from props.
    // useState(age) means "the starting value is whatever App sent us".
    // personAge    -> the current age
    // setPersonAge -> the function that changes it
    const [personAge, setPersonAge] = useState(age);

    // This function runs when the button is clicked.
    // It takes the current age and puts age + 1 into state.
    const handleBirthday = () => {
        setPersonAge(personAge + 1);
    };

    return (
        <div>
            {/* Show the name in "Last, First" format */}
            <h1>{lastName}, {firstName}</h1>

            {/* Age comes from STATE, so it changes when the button is clicked */}
            <p>Age: {personAge}</p>

            {/* Hair color comes from PROPS, so it never changes */}
            <p>Hair Color: {hairColor}</p>

            {/* onClick tells React which function to run when clicked.
                We write handleBirthday WITHOUT () so it only runs on click,
                not immediately when the component renders. */}
            <button onClick={handleBirthday}>
                Birthday Button for {firstName} {lastName}
            </button>
        </div>
    );
}

// Export so App.jsx can import it
export default PersonCard;