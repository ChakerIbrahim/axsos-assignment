import React from 'react';
import { Link } from 'react-router-dom';

// The landing page. No state, no API call — just a welcome
// and a few links to get started.
const Home = (props) => {
    return (
        <div className="home">
            <h2>A long time ago in a galaxy far, far away...</h2>
            <p>Pick a resource and an ID above to look someone up.</p>

            <p className="examples">
                {/* Link updates the URL WITHOUT reloading the page.
                    An <a> tag here would trigger a full refresh. */}
                Try <Link to="/people/1">Luke</Link>,
                <Link to="/people/4"> Vader</Link>, or
                <Link to="/planets/1"> Tatooine</Link>.
            </p>
        </div>
    );
};

export default Home;