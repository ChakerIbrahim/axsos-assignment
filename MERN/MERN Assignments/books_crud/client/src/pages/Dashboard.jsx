import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const Dashboard = (props) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/books");

      setBooks(response.data.books);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (event, id) => {
    try {
      await axios.delete(`http://localhost:8000/api/books/${id}`);

      setBooks(books.filter((book) => book._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center", fontSize: "40px" }}>Loading...</p>;
  }

  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h4">Books Dashboard</Typography>

      <Button
        variant="contained"
        color="success"
        sx={{ mt: 2 }}
        onClick={() => navigate("/create")}
      >
        Add Book
      </Button>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => {
              return (
                <TableRow key={book._id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.price}</TableCell>
                  <TableCell>
                    <Link to={`/book/${book._id}`}>Details</Link>
                    {" | "}
                    <Link to={`/edit/${book._id}`}>Edit</Link>
                    {" | "}
                    <Button
                      color="error"
                      onClick={(e) => onDelete(e, book._id)}
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
    </Box>
  );
};

export default Dashboard;
