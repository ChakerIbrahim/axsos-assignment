import axios from "axios";
import { useState } from "react";

const ProductForm = (props) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/products", {
        title,
        price,
        description,
      });
      
      props.setProducts([...props.products, res.data]);
      setTitle("");
      setPrice("");
      setDescription("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>Product Manager</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input type="number" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input type="text" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <input type="submit" value="Create" />
      </form>
    </>
  );
};

export default ProductForm;