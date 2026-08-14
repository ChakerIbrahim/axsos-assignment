import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AuthorForm from "./pages/AuthorForm";
import AuthorProfile from "./pages/AuthorProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/authors" />} />
      <Route path="/authors" element={<Dashboard />} />
      <Route path="/authors/new" element={<AuthorForm />} />
      <Route path="/authors/:id/edit" element={<AuthorProfile />} />
    </Routes>
  );
}

export default App;