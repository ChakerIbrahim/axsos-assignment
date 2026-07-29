import React from "react";


const PersonCard = (props) => {
  return (
        <div>
            <h1>{props.firstName} , {props.lastName} </h1>
            <h2>Age:{props.age}</h2>
            <h2>Hair Color : {props.hairColor}</h2>
            <button onClick={increaseAge}>Birthday Button for {props.firstName}</button>
        </div>
  );
};

export default PersonCard