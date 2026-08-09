import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Status = (props) => {

    const [players, setPlayers] = useState([]);
    const [loaded, setLoaded] = useState(false);

    // the three field names on our model. Keeping them in an
    // array means we can map over them instead of writing
    // the same block of JSX three times.
    const games = ["game1", "game2", "game3"];

    // the three choices for every cell
    const statuses = ["Playing", "Not Playing", "Undecided"];

    useEffect(() => {
        axios.get("http://localhost:8000/api/players")
            .then(res => {
                setPlayers(res.data);
                setLoaded(true);
            })
            .catch(err => console.log(err));
    }, []);

    /* ---------------------------------------------------------
       Sends a PATCH with ONE field changed. A status change is
       just an update, so it reuses the same route as any edit.
    --------------------------------------------------------- */
    const changeStatus = (playerId, game, newStatus) => {

        // square brackets around a variable key let us build
        // { game2: "Playing" } from the variables we have
        axios.patch(`http://localhost:8000/api/players/${playerId}`, { [game]: newStatus })
            .then(res => {
                // update our copy too, so the table redraws
                // without going back to the server for everything
                setPlayers( players.map( player =>
                    player._id === playerId
                        // spread copies the player into a NEW object,
                        // then the one field is overridden
                        ? { ...player, [game]: newStatus }
                        // everyone else is passed through untouched
                        : player
                ) );
            })
            .catch(err => console.log(err));
    };

    if (!loaded) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Game Status</h2>

            <table className="player-table">
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Game 1</th>
                        <th>Game 2</th>
                        <th>Game 3</th>
                    </tr>
                </thead>
                <tbody>
                    { players.map( (player, i) =>
                        <tr key={ i }>
                            <td>{ player.name }</td>

                            {/* one cell per game — three columns
                                from one map instead of three copies */}
                            { games.map( (game, j) =>
                                <td key={ j }>
                                    { statuses.map( (status, k) =>
                                        <button
                                            key={ k }
                                            // ternary highlights the current choice
                                            className={ player[game] === status
                                                ? "status-btn active"
                                                : "status-btn" }
                                            onClick={ (e) => changeStatus(player._id, game, status) }
                                        >
                                            { status }
                                        </button>
                                    ) }
                                </td>
                            ) }
                        </tr>
                    ) }
                </tbody>
            </table>
        </div>
    );
};

export default Status;