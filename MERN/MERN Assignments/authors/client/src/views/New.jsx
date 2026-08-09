import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthorForm from '../components/AuthorForm';

const New = (props) => {

    // the validation messages the server sends back
    const [errors, setErrors] = useState([]);

    // gives us a function for changing the URL from code
    const navigate = useNavigate();

    /* ---------------------------------------------------------
       This gets passed DOWN to AuthorForm. The form calls it
       on submit and hands us the data as the parameter.
    --------------------------------------------------------- */
    const createAuthor = (author) => {
        axios.post("http://localhost:8000/api/authors", author)
            .then(res => {
                // saved successfully — go back to the list
                navigate("/");
            })
            .catch(err => {
                // the server replied with a 400, so we dig the
                // messages out of Mongoose's error object
                const errorResponse = err.response.data.errors;
                const errorArr = [];

                // Object.keys gives us the field names ("name"),
                // and each one holds an object with a .message
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push( errorResponse[key].message );
                }

                setErrors(errorArr);
            });
    };

    return (
        <div>
            <h2>Add a new author:</h2>

            <AuthorForm
                initialName=""              // blank, because this is a new author
                onSubmitProp={ createAuthor }
                errors={ errors }
            />
        </div>
    );
};

export default New;