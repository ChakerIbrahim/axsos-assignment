// Routes = the container that picks ONE matching route to render.
// Route  = a single URL pattern paired with the component to show.
import { Routes, Route } from "react-router-dom";

// Our three page components.
import Home from "./components/Home.jsx";
import Display from "./components/Display.jsx";
import StyledWord from "./components/StyledWord.jsx";

const App = () => {
  return (
    <Routes>
      {/* Static route: matches ONLY the exact path "/home". */}
      <Route path="/home" element={<Home />} />

      {/*
        Dynamic route: ":value" is a URL parameter — a placeholder.
        It matches "/4", "/hello", "/banana", anything with one segment.
        The matched text is readable inside Display via useParams().
        This single route covers BOTH requirement #2 (numbers) and
        requirement #3 (words), because they have the same URL shape.
      */}
      <Route path="/:value" element={<Display />} />

      {/*
        Three dynamic segments in a row.
        "/hello/blue/red" gives us word="hello", color="blue", bgColor="red".
      */}
      <Route path="/:word/:color/:bgColor" element={<StyledWord />} />
    </Routes>
  );
};

export default App;