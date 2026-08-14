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
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getAuthors = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/authors");

      setAuthors(response.data.authors);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (event, id) => {
    try {
      await axios.delete(`http://localhost:8000/api/authors/${id}`);

      setAuthors(authors.filter((author) => author._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAuthors();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center", fontSize: "40px" }}>Loading...</p>;
  }

  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h4">Favorite authors</Typography>

      <Box sx={{ mt: 2 }}>
        <Link to="/authors/new">Add an author</Link>
      </Box>

      <Typography sx={{ mt: 2 }}>We have quotes by:</Typography>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Author</TableCell>
              <TableCell>Actions available</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authors.map((author) => {
              return (
                <TableRow key={author._id}>
                  <TableCell>{author.name}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => navigate(`/authors/${author._id}/edit`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ ml: 1 }}
                      onClick={(e) => onDelete(e, author._id)}
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
