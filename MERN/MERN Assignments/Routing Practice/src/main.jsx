// StrictMode is a development-only wrapper that helps catch bugs early.
// createRoot is React 18+'s way of attaching a React app to the DOM.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Global styles for the whole app.
import "./index.css";

// The root component that holds all our route definitions.
import App from "./App.jsx";

// BrowserRouter watches the browser's URL bar and makes the current
// URL available to every component inside it. Without this wrapper,
// hooks like useParams and components like <Route> won't work.
import { BrowserRouter } from "react-router-dom";

// Find the <div id="root"> in index.html and render our app inside it.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Everything inside BrowserRouter is "routing aware" */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);