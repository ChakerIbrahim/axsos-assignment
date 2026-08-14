import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Navigation from "../components/Navigation";

const PlayerList = (props) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playerToDelete, setPlayerToDelete] = useState(null);

  const getPlayers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/players");

      setPlayers(response.data.players);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/players/${playerToDelete._id}`,
      );

      setPlayers(players.filter((player) => player._id !== playerToDelete._id));
      setPlayerToDelete(null);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPlayers();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center", fontSize: "40px" }}>Loading...</p>;
  }

  return (
    <Box sx={{ m: 2 }}>
      <Navigation />

      <Box sx={{ mb: 2 }}>
        <Typography component="span" sx={{ fontWeight: "bold" }}>
          List
        </Typography>
        {" | "}
        <Link to="/players/new">Add Player</Link>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Team Name</TableCell>
              <TableCell>Preferred Position</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player) => {
              return (
                <TableRow key={player._id}>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{player.position}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => setPlayerToDelete(player)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={playerToDelete ? true : false}
        onClose={() => setPlayerToDelete(null)}
      >
        <DialogTitle>
          Are you sure you want to remove {playerToDelete ? playerToDelete.name : ""}?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setPlayerToDelete(null)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={onDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PlayerList;
