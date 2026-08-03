import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
// BrowserRouter is the central hub — it watches the URL and
// tracks navigation history for everything inside it.
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* every component that needs to know about the URL
            must sit INSIDE BrowserRouter */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);