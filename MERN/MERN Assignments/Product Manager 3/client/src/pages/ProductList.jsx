import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductForm from "./ProductForm";

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/products");
      setProducts(res.data);
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      await axios.delete("http://localhost:8000/api/products/" + productId);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <ProductForm products={products} setProducts={setProducts} />
      <hr />
      <h2>All Products:</h2>
      {loaded &&
        products.map((product) => (
          <p key={product._id}>
            <Link to={"/products/" + product._id}>{product.title}</Link>
            <button onClick={(e) => { deleteProduct(product._id) }}>
              Delete
            </button>
          </p>
        ))}
    </div>
  );
};

export default ProductList;