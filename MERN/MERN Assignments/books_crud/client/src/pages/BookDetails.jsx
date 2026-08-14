import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const BookDetails = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  const fetchBookById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/books/${params.id}`,
      );

      setBook(response.data.book);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBookById();
  }, []);

  return book ? (
    <Box sx={{ m: 2 }}>
      <Typography variant="h4">{book.title}</Typography>
      <Typography>Author: {book.author}</Typography>
      <Typography>Price: {book.price}</Typography>
      <Typography>Description: {book.description}</Typography>

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => navigate(`/edit/${book._id}`)}
      >
        Edit
      </Button>
      <Button sx={{ mt: 2 }} onClick={() => navigate("/")}>
        Back
      </Button>
    </Box>
  ) : (
    <p>Loading...</p>
  );
};

export default BookDetails;
