import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateAuthor from "./pages/CreateAuthor";
import UpdateAuthor from "./pages/UpdateAuthor";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/authors/new" element={<CreateAuthor />} />
      <Route path="/authors/:id/edit" element={<UpdateAuthor />} />
    </Routes>
  );
}

export default App;
