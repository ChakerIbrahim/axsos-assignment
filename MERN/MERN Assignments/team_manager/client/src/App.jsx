import { Navigate, Route, Routes } from "react-router-dom";
import PlayerList from "./pages/PlayerList";
import AddPlayer from "./pages/AddPlayer";
import PlayerStatus from "./pages/PlayerStatus";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/players/list" />} />
      <Route path="/players/list" element={<PlayerList />} />
      <Route path="/players/new" element={<AddPlayer />} />
      <Route path="/status/game/:gameNumber" element={<PlayerStatus />} />
    </Routes>
  );
}

export default App;
