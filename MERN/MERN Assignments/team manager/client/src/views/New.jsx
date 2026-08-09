import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PlayerForm from '../components/PlayerForm';

const New = (props) => {

    // the validation messages the SERVER sends back
    const [errors, setErrors] = useState([]);

    // gives us a function for changing the URL from code
    const navigate = useNavigate();

    /* ---------------------------------------------------------
       Passed DOWN to PlayerForm. The form calls it on submit
       and hands us the data as the parameter.
    --------------------------------------------------------- */
    const createPlayer = (player) => {
        axios.post("http://localhost:8000/api/players", player)
            .then(res => {
                // saved successfully — go back to the roster
                navigate("/");
            })
            .catch(err => {
                // the server replied with a 400, so we dig the
                // messages out of Mongoose's error object
                const errorResponse = err.response.data.errors;
                const errorArr = [];

                // Object.keys gives us the field names, and each
                // one holds an object with a .message
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push( errorResponse[key].message );
                }

                setErrors(errorArr);
            });
    };

    return (
        <div>
            <h2>Add Player</h2>

            <PlayerForm
                onSubmitProp={ createPlayer }
                errors={ errors }
            />
        </div>
    );
};

export default New;