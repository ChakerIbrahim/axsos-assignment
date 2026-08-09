import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// BrowserRouter watches the URL for everything inside it
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);