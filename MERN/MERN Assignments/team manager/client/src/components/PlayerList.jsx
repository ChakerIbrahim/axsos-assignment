import React from 'react';
import axios from 'axios';
import DeleteButton from './DeleteButton';

/* -------------------------------------------------------------
   This component holds NO state of its own. It receives the
   players and a callback, and its only job is to draw them.
------------------------------------------------------------- */
const PlayerList = (props) => {

    const { players, removeFromDom } = props;

    const deletePlayer = (playerId) => {
        axios.delete(`http://localhost:8000/api/players/${playerId}`)
            .then(res => {
                // gone from the database — now tell the parent to
                // take it out of state so the DOM updates
                removeFromDom(playerId);
            })
            .catch(err => console.log(err));
    };

    return (
        <table className="player-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Preferred Position</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {/* map turns each player object into a table row.
                    It returns a NEW array of JSX, leaving the
                    original array untouched. */}
                { players.map( (player, i) =>
                    <tr key={ i }>
                        <td>{ player.name }</td>
                        <td>{ player.preferredPosition }</td>
                        <td>
                            {/* the arrow function is what lets us send the id.
                                Without it the callback would run on render. */}
                            <DeleteButton
                                playerName={ player.name }
                                successCallback={ () => deletePlayer(player._id) }
                            />
                        </td>
                    </tr>
                ) }
            </tbody>
        </table>
    );
};

export default PlayerList;