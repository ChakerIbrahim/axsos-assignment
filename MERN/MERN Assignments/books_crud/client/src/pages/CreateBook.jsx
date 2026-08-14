import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const CreateBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/books", {
        title,
        author,
        price,
        description,
      });

      navigate("/");
    } catch (err) {
      console.log(err);

      setErrors(err.response.data.errors);
    }
  };

  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h4">Create Book</Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ m: 2 }}>
          <TextField
            id="title"
            name="title"
            label="Title"
            variant="filled"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={errors.title ? true : false}
            helperText={errors.title ? errors.title.message : ""}
          />
        </Box>
        <Box sx={{ m: 2 }}>
          <TextField
            id="author"
            name="author"
            label="Author"
            variant="filled"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            error={errors.author ? true : false}
            helperText={errors.author ? errors.author.message : ""}
          />
        </Box>
        <Box sx={{ m: 2 }}>
          <TextField
            id="price"
            name="price"
            type="number"
            label="Price"
            variant="filled"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            error={errors.price ? true : false}
            helperText={errors.price ? errors.price.message : ""}
          />
        </Box>
        <Box sx={{ m: 2 }}>
          <TextField
            id="description"
            name="description"
            label="Description"
            variant="filled"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={errors.description ? true : false}
            helperText={errors.description ? errors.description.message : ""}
          />
        </Box>

        <Button type="submit" variant="contained" color="success" sx={{ m: 2 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CreateBook;