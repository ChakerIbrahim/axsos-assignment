import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerList from '../components/PlayerList';

const Main = (props) => {

    // the array of players. Empty until the request comes back.
    const [players, setPlayers] = useState([]);

    // stops the table rendering before we have data
    const [loaded, setLoaded] = useState(false);

    /* ---------------------------------------------------------
       useEffect runs AFTER the first render.
       The empty dependency array [] means "run once only" —
       this page has nothing to watch for changes.
    --------------------------------------------------------- */
    useEffect(() => {
        axios.get("http://localhost:8000/api/players")
            .then(res => {
                setPlayers(res.data);
                setLoaded(true);
            })
            .catch(err => console.log(err));
    }, []);

    /* ---------------------------------------------------------
       Called by PlayerList after a successful delete.
       filter returns a NEW array without the deleted player,
       so React sees a change and re-renders — no page refresh.
    --------------------------------------------------------- */
    const removeFromDom = (playerId) => {
        setPlayers( players.filter( player => player._id !== playerId ) );
    };

    return (
        <div>
            <h2>Team Roster</h2>

            {/* only draw the table once the data has arrived */}
            { loaded
                ? <PlayerList players={ players } removeFromDom={ removeFromDom } />
                : <p>Loading...</p> }
        </div>
    );
};

export default Main;