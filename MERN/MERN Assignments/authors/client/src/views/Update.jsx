import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AuthorForm from '../components/AuthorForm';

const Update = (props) => {

    // reads the :id captured by the route path
    const { id } = useParams();

    const [author, setAuthor] = useState(null);
    const [errors, setErrors] = useState([]);
    const [loaded, setLoaded] = useState(false);

    // BONUS: true when the id doesn't match any author
    const [notFound, setNotFound] = useState(false);

    const navigate = useNavigate();

    // fetch the author we're editing so we can pre-fill the form
    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors/${id}`)
            .then(res => {
                setAuthor(res.data);
                setLoaded(true);
            })
            .catch(err => {
                // the server sent a 404 — show the apology instead
                setNotFound(true);
                setLoaded(true);
            });
    }, [id]);

    const updateAuthor = (updatedAuthor) => {
        axios.patch(`http://localhost:8000/api/authors/${id}`, updatedAuthor)
            .then(res => {
                navigate("/");
            })
            .catch(err => {
                // same error-unpacking as the add page, because
                // runValidators means edits are checked too
                const errorResponse = err.response.data.errors;
                const errorArr = [];

                for (const key of Object.keys(errorResponse)) {
                    errorArr.push( errorResponse[key].message );
                }

                setErrors(errorArr);
            });
    };

    // still waiting on the request
    if (!loaded) {
        return <p>Loading...</p>;
    }

    // BONUS: no author with that id
    if (notFound) {
        return (
            <div>
                <p>
                    We apologize, but we couldn't locate the author you're
                    searching for. Would you like to add this author to our
                    database?
                </p>
                <Link to="/authors/new">Add this author</Link>
            </div>
        );
    }

    return (
        <div>
            <h2>Edit this author:</h2>

            <AuthorForm
                initialName={ author.name }   // pre-fills the input
                onSubmitProp={ updateAuthor }
                errors={ errors }
            />
        </div>
    );
};

export default Update;