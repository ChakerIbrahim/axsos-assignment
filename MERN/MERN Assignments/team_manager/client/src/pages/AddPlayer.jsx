import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Navigation from "../components/Navigation";

const AddPlayer = (props) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const isNameValid = name.length >= 3;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/players", {
        name,
        position,
      });

      navigate("/players/list");
    } catch (err) {
      console.log(err);

      setErrors(err.response.data.errors);
    }
  };

  return (
    <Box sx={{ m: 2 }}>
      <Navigation />

      <Box sx={{ mb: 2 }}>
        <Link to="/players/list">List</Link>
        {" | "}
        <Typography component="span" sx={{ fontWeight: "bold" }}>
          Add Player
        </Typography>
      </Box>

      <Typography variant="h6">Add Player</Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ m: 2 }}>
          <TextField
            id="name"
            name="name"
            label="Player Name"
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name ? true : false}
            helperText={errors.name ? errors.name.message : ""}
          />
        </Box>

        {name.length > 0 && !isNameValid ? (
          <Typography color="error" sx={{ mx: 2 }}>
            Name must be at least 3 characters in length
          </Typography>
        ) : (
          ""
        )}

        <Box sx={{ m: 2 }}>
          <TextField
            id="position"
            name="position"
            label="Preferred Position"
            variant="filled"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="success"
          sx={{ m: 2 }}
          disabled={!isNameValid}
        >
          Add
        </Button>
      </form>
    </Box>
  );
};

export default AddPlayer;
