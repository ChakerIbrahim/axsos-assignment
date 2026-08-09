import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './views/Main';
import New from './views/New';
import Update from './views/Update';

function App() {
    return (
        <div className="App">
            <h1>Favorite Authors</h1>

            <Routes>
                {/* the list page */}
                <Route path="/" element={ <Main /> } />

                {/* the add page — must come BEFORE any /authors/:id route
                    so that "new" isn't mistaken for an id */}
                <Route path="/authors/new" element={ <New /> } />

                {/* the edit page — :id captures the author's _id */}
                <Route path="/authors/:id/edit" element={ <Update /> } />
            </Routes>
        </div>
    );
}

export default App;