import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuthorList from '../components/AuthorList';

const Main = (props) => {

    // the array of authors. Empty until the request comes back.
    const [authors, setAuthors] = useState([]);

    // stops the table rendering before we have data
    const [loaded, setLoaded] = useState(false);

    /* ---------------------------------------------------------
       useEffect runs AFTER the first render.
       The empty dependency array [] means "run once only" —
       this page has nothing to watch for changes.
    --------------------------------------------------------- */
    useEffect(() => {
        axios.get("http://localhost:8000/api/authors")
            .then(res => {
                // BONUS: sort alphabetically.
                // spread copies the array first so we sort a COPY,
                // because sort would otherwise mutate the original.
                const sorted = [ ...res.data ].sort( (a, b) =>
                    a.name > b.name ? 1 : -1
                );

                setAuthors(sorted);
                setLoaded(true);
            })
            .catch(err => console.log(err));
    }, []);

    /* ---------------------------------------------------------
       Called by AuthorList after a successful delete.
       filter returns a NEW array without the deleted author,
       so React sees a change and re-renders — no page refresh.
    --------------------------------------------------------- */
    const removeFromDom = (authorId) => {
        setAuthors( authors.filter( author => author._id !== authorId ) );
    };

    return (
        <div>
            <p>
                <Link to="/authors/new">Add an author</Link>
            </p>
            <p>We have quotes by:</p>

            {/* only draw the table once the data has arrived */}
            { loaded
                ? <AuthorList authors={ authors } removeFromDom={ removeFromDom } />
                : <p>Loading...</p> }
        </div>
    );
};

export default Main;