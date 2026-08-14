import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Navigation = (props) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h5">Team Manager</Typography>

      <Box sx={{ mt: 1 }}>
        <Link to="/players/list">Manage Players</Link>
        {" | "}
        <Link to="/status/game/1">Manage Player Status</Link>
      </Box>
    </Box>
  );
};

export default Navigation;
