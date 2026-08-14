import { useEffect} from "react"
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {

  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard/>}/> 
    </Routes>
  )
}

export default App
