import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteButton from "./DeleteButton";

const PersonList = (props) => {
  return(
    <div>
      {props.people.map((person, i)=>
          <p key={i}>{person.lastName}, {person.firstName}</p>
      )}
    </div>
  )
}
export default PersonList;

const PersonList = (props) => {
    const {people, removeFromDom } = props;
    
    const deletePerson = (personId) => {
        axios.delete('http://localhost:8000/api/people/' + personId)
            .then(res => {
                removeFromDom(personId)
            })
            .catch(err => console.error(err));
    }
    
    return (
        <div>
            {people.map((person, idx) => {
                return <p key={idx}>
                    <Link to={"/" + person._id}>
                        {person.lastName}, {person.firstName}
                    </Link>
                    |
                    <Link to={"/" + person._id + "/edit"}>
                    Edit
                    </Link>
                    |

                    <Deletebutton sucessCallback={()=>removeFromDom(person._id)}/>
                </p>
            })}
        </div>
    )
}
    
export default PersonList;