import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import Home from './components/Home';
import Detail from './components/Detail';

function App() {
    return (
        <div className="App">
            <h1>Luke APIwalker</h1>

            {/* OUTSIDE Routes, so it stays on screen no matter
                which route is active — that's what makes it
                the "persistent" search component */}
            <SearchForm />

            {/* Routes is the frame; each Route is a picture in it.
                Only the one whose path matches the URL renders. */}
            <Routes>
                {/* the index route — the landing page */}
                <Route path="/" element={ <Home /> } />

                {/* TWO url params in one path.
                    :resource captures "people" or "planets"
                    :id       captures the number
                    So /people/1 and /planets/3 both land here. */}
                <Route path="/:resource/:id" element={ <Detail /> } />
            </Routes>
        </div>
    );
}

export default App;