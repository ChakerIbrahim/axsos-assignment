import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateBook from "./pages/CreateBook";
import BookDetails from "./pages/BookDetails";
import UpdateBook from "./pages/UpdateBook";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/create" element={<CreateBook />} />
      <Route path="/book/:id" element={<BookDetails />} />
      <Route path="/edit/:id" element={<UpdateBook />} />
    </Routes>
  );
}

export default App;
