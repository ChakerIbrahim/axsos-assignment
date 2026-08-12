import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import DeleteButton from "../components/DeleteButton";

const ProductDetail = (props) => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/products/" + id);
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <p>{product.title}</p>
      <p>Price: {product.price}</p>
      <p>Description: {product.description}</p>

      <Link to={"/products/" + id + "/edit"}>Edit</Link>

      {/* SAME component as the list uses — but here the callback
          navigates home instead of updating an array */}
      <DeleteButton
        productId={id}
        successCallback={() => navigate("/")}
      />
    </div>
  );
};

export default ProductDetail;