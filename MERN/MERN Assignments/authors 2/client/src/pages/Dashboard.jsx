import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAuthors = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/authors");
      setAuthors(response.data.authors ?? []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (event, id) => {
    try {
      await axios.delete(`http://localhost:8000/api/authors/${id}`);
      setAuthors((prev) => prev.filter((author) => author._id !== id));
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
    <div>
      <h1>Favorite authors</h1>
      <Link to="/authors/new">Add an author</Link>
      <p>We have quotes by:</p>
      <table>
        <thead>
          <tr>
            <th>Author</th>
            <th>Actions Available</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author._id}>
              <td>{author.name}</td>
              <td>
                <Link to={`/authors/${author._id}/edit`}>Edit</Link>
              </td>
              <td>
                <button onClick={(e) => onDelete(e, author._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;