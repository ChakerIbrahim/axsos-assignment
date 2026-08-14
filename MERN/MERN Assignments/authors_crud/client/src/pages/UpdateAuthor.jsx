import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const UpdateAuthor = (props) => {
  const params = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchAuthorById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/authors/${params.id}`,
      );

      if (response.data.author) {
        setName(response.data.author.name);
      } else {
        setNotFound(true);
      }
    } catch (err) {
      console.log(err);

      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8000/api/authors/${params.id}`, {
        name,
      });

      navigate("/");
    } catch (err) {
      console.log(err);

      setErrors(err.response.data.errors);
    }
  };

  useEffect(() => {
    fetchAuthorById();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center", fontSize: "40px" }}>Loading...</p>;
  }

  if (notFound) {
    return (
      <Box sx={{ m: 2 }}>
        <Typography variant="h4">Favorite authors</Typography>

        <Typography color="error" sx={{ mt: 2 }}>
          We're sorry, but we could not find the author you're searching for.
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Link to="/authors/new">
            Would you like to add this author to our database?
          </Link>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h4">Favorite authors</Typography>

      <Box sx={{ mt: 2 }}>
        <Link to="/">Home</Link>
      </Box>

      <Typography sx={{ mt: 2 }}>Edit this author:</Typography>

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

export default UpdateAuthor;
