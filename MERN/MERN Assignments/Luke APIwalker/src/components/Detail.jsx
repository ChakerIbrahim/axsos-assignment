import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const Detail = (props) => {

    /* ---------------------------------------------------------
       useParams reads the values captured by the Route path.
       Our path was "/:resource/:id", so for the URL /people/1
       this gives us resource = "people" and id = "1".
       The names in the braces MUST match the names after the
       colons in the Route.
    --------------------------------------------------------- */
    const { resource, id } = useParams();

    // the fetched object. null means "nothing loaded yet"
    const [data, setData] = useState(null);

    // the character's homeworld (Ninja Bonus) — only for people
    const [homeworld, setHomeworld] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    /* ---------------------------------------------------------
       Pulls the ID off the end of a SWAPI url.
       "https://swapi.dev/api/planets/1/" becomes "1"
       filter drops the empty strings that split leaves behind.
    --------------------------------------------------------- */
    const getIdFromUrl = (url) => {
        const parts = url.split("/").filter( part => part !== "" );
        return parts[ parts.length - 1 ];
    };

    /* ---------------------------------------------------------
       useEffect runs AFTER the component renders.
       The dependency array [resource, id] means it re-runs
       whenever either of those changes — so searching for a new
       character fetches fresh data instead of showing the old one.
    --------------------------------------------------------- */
    useEffect(() => {

        // flips to true if the user navigates away mid-request,
        // so we don't try to update a component that's gone
        let ignore = false;

        // reset everything before the new request
        setLoading(true);
        setError(false);
        setData(null);
        setHomeworld(null);

        axios.get(`https://swapi.dev/api/${resource}/${id}/`)
            .then( response => {
                if (ignore) return;

                // axios has already parsed the JSON for us
                setData( response.data );
                setLoading(false);

                // NINJA BONUS: a person's homeworld arrives as a
                // URL, not a name, so it takes a second request.
                if (resource === "people") {
                    axios.get( response.data.homeworld )
                        .then( res => {
                            if (ignore) return;
                            setHomeworld( res.data );
                        })
                        .catch( err => {
                            // the homeworld is a nice extra, not
                            // essential — a failure here shouldn't
                            // blank out the whole page
                        });
                }
            })
            .catch( err => {
                if (ignore) return;
                setError(true);
                setLoading(false);
            });

        // THE CLEANUP FUNCTION.
        // React calls this when the component unmounts, and again
        // before every re-run of the effect.
        return () => {
            ignore = true;
        };

    }, [resource, id]);   // <-- the dependency array

    // ---------- while waiting ----------
    if (loading) {
        return <p className="status">Loading...</p>;
    }

    // ---------- if the request failed ----------
    if (error) {
        return (
            <div className="error-box">
                <h2>These aren't the droids you're looking for</h2>
                <img src="/obiwan.jpg" alt="Obi-Wan Kenobi" className="obiwan" />
                <p><Link to="/">Go home</Link></p>
            </div>
        );
    }

    // ---------- success ----------
    return (
        <div className="detail">
            <h2>{ data.name }</h2>

            {/* the two resources have different attributes,
                so a ternary picks which list to show */}
            { resource === "people"
                ? <ul>
                    <li><strong>Height:</strong> { data.height }</li>
                    <li><strong>Mass:</strong> { data.mass }</li>
                    <li><strong>Hair Color:</strong> { data.hair_color }</li>
                    <li><strong>Eye Color:</strong> { data.eye_color }</li>
                    <li><strong>Birth Year:</strong> { data.birth_year }</li>

                    {/* NINJA BONUS: name plus a link to the planet.
                        Only renders once the second request lands. */}
                    <li>
                        <strong>Homeworld:</strong>{" "}
                        { homeworld
                            ? <Link to={ `/planets/${ getIdFromUrl(data.homeworld) }` }>
                                { homeworld.name }
                              </Link>
                            : "loading..." }
                    </li>
                  </ul>

                : <ul>
                    <li><strong>Climate:</strong> { data.climate }</li>
                    <li><strong>Terrain:</strong> { data.terrain }</li>
                    <li><strong>Population:</strong> { data.population }</li>
                    <li><strong>Gravity:</strong> { data.gravity }</li>
                    <li><strong>Diameter:</strong> { data.diameter }</li>
                  </ul>
            }
        </div>
    );
};

export default Detail;