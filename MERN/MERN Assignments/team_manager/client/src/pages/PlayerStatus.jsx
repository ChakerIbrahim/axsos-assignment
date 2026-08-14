import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Navigation from "../components/Navigation";

const PlayerStatus = (props) => {
  const params = useParams();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const gameKey = `game${params.gameNumber}`;

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

  const onStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:8000/api/players/${id}`, {
        [gameKey]: status,
      });

      setPlayers(
        players.map((player) => {
          if (player._id === id) {
            return { ...player, [gameKey]: status };
          }
          return player;
        }),
      );
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

      <Typography variant="h6">
        Player Status - Game {params.gameNumber}
      </Typography>

      <Box sx={{ my: 2 }}>
        <Link to="/status/game/1">Game 1</Link>
        {" | "}
        <Link to="/status/game/2">Game 2</Link>
        {" | "}
        <Link to="/status/game/3">Game 3</Link>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Team Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player) => {
              return (
                <TableRow key={player._id}>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>
                    <Button
                      color="success"
                      variant={
                        player[gameKey] === "Playing" ? "contained" : "outlined"
                      }
                      onClick={() => onStatusChange(player._id, "Playing")}
                    >
                      Playing
                    </Button>
                    <Button
                      color="error"
                      sx={{ ml: 1 }}
                      variant={
                        player[gameKey] === "Not Playing"
                          ? "contained"
                          : "outlined"
                      }
                      onClick={() => onStatusChange(player._id, "Not Playing")}
                    >
                      Not Playing
                    </Button>
                    <Button
                      color="warning"
                      sx={{ ml: 1 }}
                      variant={
                        player[gameKey] === "Undecided"
                          ? "contained"
                          : "outlined"
                      }
                      onClick={() => onStatusChange(player._id, "Undecided")}
                    >
                      Undecided
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PlayerStatus;
