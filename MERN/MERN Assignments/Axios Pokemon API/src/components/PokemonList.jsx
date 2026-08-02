import React, { useState } from 'react';
// the library we installed with npm — brought in like any other module
import axios from 'axios';

const PokemonList = (props) => {

    /* ---------------------------------------------------------
       STATE
       pokemon  — the array of results once the call comes back.
                  Starts empty: nothing has been fetched yet.
       loading  — true while we're waiting, so we can tell the
                  user something is happening.
       error    — a message if the call fails ("" shows nothing).
    --------------------------------------------------------- */
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    /* ---------------------------------------------------------
       THE API CALL
       Runs when the button is clicked.
    --------------------------------------------------------- */
    const fetchPokemon = (e) => {
        // clear anything left over from a previous attempt
        setError("");
        setLoading(true);

        // axios.get says "this is a GET request" right in the method
        // name — no extra arguments needed.
        // It returns a PROMISE, so the code below doesn't wait here.
        axios.get("https://pokeapi.co/api/v2/pokemon?limit=807")
            .then( response => {
                // SUCCESS — the promise resolved.
                // axios has already parsed the JSON for us, so the
                // data is sitting on response.data straight away.
                // The API wraps its list in a "results" key.
                setPokemon( response.data.results );
                setLoading(false);
            })
            .catch( err => {
                // FAILURE — the promise rejected (no internet,
                // bad URL, server down...)
                setError("Could not load Pokemon. Please try again.");
                setLoading(false);
            });

        // this line runs BEFORE the data arrives — proof the call
        // is asynchronous and isn't freezing the page
        console.log("Request sent. Waiting for a response...");
    };

    return (
        <div className="pokemon-wrapper">
            <h1>Pokemon</h1>

            {/* onClick is camelCase, and we pass the function
                itself — fetchPokemon() with parentheses would run
                immediately on render */}
            <button className="fetch-btn" onClick={ fetchPokemon }>
                Fetch Pokemon
            </button>

            {/* three states, each with its own message */}
            { loading ? <p className="status">Loading...</p> : "" }
            { error ? <p className="error">{ error }</p> : "" }

            {/* map turns each result object into a list item.
                It returns a NEW array of JSX, leaving the
                original untouched. */}
            <ul className="pokemon-list">
                { pokemon.map( (poke, i) =>
                    <li key={ i }>{ poke.name }</li>
                ) }
            </ul>
        </div>
    );
};

export default PokemonList;