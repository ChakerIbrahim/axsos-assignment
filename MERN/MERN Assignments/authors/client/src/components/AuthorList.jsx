import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

/* -------------------------------------------------------------
   This component holds NO state. It receives the authors and a
   callback, and its only job is to draw them.
------------------------------------------------------------- */
const AuthorList = (props) => {

    const { authors, removeFromDom } = props;

    const deleteAuthor = (authorId) => {
        axios.delete(`http://localhost:8000/api/authors/${authorId}`)
            .then(res => {
                // the row is gone from the database — now tell the
                // parent to take it out of state so the DOM updates
                removeFromDom(authorId);
            })
            .catch(err => console.log(err));
    };

    return (
        <table className="author-table">
            <thead>
                <tr>
                    <th>Author</th>
                    <th>Actions Available</th>
                </tr>
            </thead>
            <tbody>
                {/* map turns each author object into a table row.
                    It returns a NEW array of JSX, leaving the
                    original array untouched. */}
                { authors.map( (author, i) =>
                    <tr key={ i }>
                        <td>{ author.name }</td>
                        <td>
                            {/* build the edit URL from this author's _id */}
                            <Link to={ `/authors/${author._id}/edit` }>Edit</Link>

                            {/* the arrow function is what lets us send the id.
                                Without it the handler would only get the event. */}
                            <button onClick={ (e) => deleteAuthor(author._id) }>
                                Delete
                            </button>
                        </td>
                    </tr>
                ) }
            </tbody>
        </table>
    );
};

export default AuthorList;