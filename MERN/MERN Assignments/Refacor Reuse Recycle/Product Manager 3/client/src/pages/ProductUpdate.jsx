import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";

const ProductUpdate = (props) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  // stops the form rendering before we have the data to fill it with
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/products/" + id);
      setProduct(res.data);
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  /* ---------------------------------------------------------
     Passed DOWN to the SAME ProductForm the list page uses.
     The only difference is this one PATCHes instead of POSTs.
  --------------------------------------------------------- */
  const updateProduct = async (updatedProduct) => {
    try {
      await axios.patch("http://localhost:8000/api/products/" + id, updatedProduct);
      navigate("/products/" + id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Update a Product</h1>

      {/* wait for the data — useState only reads its argument
          on the FIRST render, so the values must be there
          before the form mounts */}
      {loaded && (
        <ProductForm
          initialTitle={product.title}
          initialPrice={product.price}
          initialDescription={product.description}
          onSubmitProp={updateProduct}
          buttonText="Update"
        />
      )}
    </div>
  );
};

export default ProductUpdate;