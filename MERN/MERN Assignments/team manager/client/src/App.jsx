import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Main from './views/Main';
import New from './views/New';
import Status from './views/Status';

function App() {
    return (
        <div className="App">
            <h1>Team Manager</h1>

            {/* OUTSIDE Routes, so the nav stays on screen
                no matter which page is showing */}
            <nav>
                <Link to="/">Team Roster</Link>
                <Link to="/players/new">Add Player</Link>
                <Link to="/players/status">Game Status</Link>
            </nav>

            <Routes>
                {/* the roster page */}
                <Route path="/" element={ <Main /> } />

                {/* specific paths go ABOVE wildcard ones, so that
                    "new" and "status" are never read as an id */}
                <Route path="/players/new" element={ <New /> } />
                <Route path="/players/status" element={ <Status /> } />
            </Routes>
        </div>
    );
}

export default App;