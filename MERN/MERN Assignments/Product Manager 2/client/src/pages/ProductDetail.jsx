import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetail = (props) => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

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
    </div>
  );
};

export default ProductDetail;