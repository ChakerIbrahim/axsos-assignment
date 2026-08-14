import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AuthorForm = (props) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("http://localhost:8000/api/authors", { name });
      navigate("/authors");
    } catch (err) {
      console.log(err.response?.data); // remove once the message shows correctly
      setError(
        err.response?.data?.errors?.name?.message ??
          err.response?.data?.message ??
          "Something went wrong"
      );
    }
  };

  return (
    <div>
      <Link to="/authors">Home</Link>
      <h1>Favorite authors</h1>
      <p>Add a new author:</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
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
  );
};

export default AuthorForm;