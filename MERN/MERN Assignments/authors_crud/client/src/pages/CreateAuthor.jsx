import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const CreateAuthor = (props) => {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/authors", {
        name,
      });

      navigate("/");
    } catch (err) {
      console.log(err);

      setErrors(err.response.data.errors);
    }
  };

  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h4">Favorite authors</Typography>

      <Box sx={{ mt: 2 }}>
        <Link to="/">Home</Link>
      </Box>

      <Typography sx={{ mt: 2 }}>Add a new author:</Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ m: 2 }}>
          <TextField
            id="name"
            name="name"
            label="Name"
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name ? true : false}
            helperText={errors.name ? errors.name.message : ""}
          />
        </Box>

        <Button sx={{ m: 2 }} onClick={() => navigate("/")}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="success">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CreateAuthor;
