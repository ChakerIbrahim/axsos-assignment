import React from 'react';
import './App.css';                              // direct CSS import
import UserForm from './components/UserForm';    // our own component

// App is the parent component, sitting at the top of the hierarchy.
function App() {
    return (
        // JSX must return ONE parent element, so everything is wrapped
        // className, not class — class is a reserved word in JavaScript
        <div className="App">
            <h1>More Forms</h1>
            {/* self-closing, because it wraps no content */}
            <UserForm />
        </div>
    );
}

export default App;