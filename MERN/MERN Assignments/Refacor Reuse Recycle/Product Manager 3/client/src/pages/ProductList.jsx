import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import DeleteButton from "../components/DeleteButton";

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

  /* ---------------------------------------------------------
     Passed DOWN to ProductForm. The form calls this on submit
     and hands us the data as the parameter.
     The state update lives HERE now, not inside the form.
  --------------------------------------------------------- */
  const createProduct = async (product) => {
    try {
      const res = await axios.post("http://localhost:8000/api/products", product);

      // spread copies the existing products into a NEW array,
      // then the new one is added on the end
      setProducts([...products, res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  /* ---------------------------------------------------------
     Passed DOWN to DeleteButton. Runs after a successful delete.
     filter returns a NEW array without the deleted product.
  --------------------------------------------------------- */
  const removeFromDom = (productId) => {
    setProducts(products.filter((product) => product._id !== productId));
  };

  return (
    <div>
      <h1>Product Manager</h1>

      <ProductForm
        initialTitle=""
        initialPrice=""
        initialDescription=""
        onSubmitProp={createProduct}
        buttonText="Create"
      />

      <hr />
      <h2>All Products:</h2>

      {loaded &&
        products.map((product) => (
          <p key={product._id}>
            <Link to={"/products/" + product._id}>{product.title}</Link>

            {/* the arrow function is what lets us send the id */}
            <DeleteButton
              productId={product._id}
              successCallback={() => removeFromDom(product._id)}
            />
          </p>
        ))}
    </div>
  );
};

export default ProductList;