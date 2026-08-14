import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const AuthorProfile = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState(null);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const fetchAuthorById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/authors/${params.id}`
      );
      setAuthor(response.data.author);
      setName(response.data.author.name);
    } catch (err) {
      console.log(err);
    }
  };

  const updateAuthor = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.put(`http://localhost:8000/api/authors/${params.id}`, {
        name,
      });
      navigate("/authors");
    } catch (err) {
      setError(
        err.response?.data?.errors?.name?.message ??
          err.response?.data?.message ??
          "Something went wrong"
      );
    }
  };

  useEffect(() => {
    fetchAuthorById();
  }, [params.id]);

  return author ? (
    <div>
      <Link to="/authors">Home</Link>
      <h1>Favorite authors</h1>
      <p>Edit this author:</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={updateAuthor}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <Link to="/authors">Cancel</Link>
        <input type="submit" value="Submit" />
      </form>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default AuthorProfile;