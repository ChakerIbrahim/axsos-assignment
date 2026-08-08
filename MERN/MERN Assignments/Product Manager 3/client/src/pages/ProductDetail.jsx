import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";


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

  const deleteproduct = async()=> {
    try {
      await axios.delete("http://localhost:8000/api/products/"+ id);
      navigate("/");
    } catch(err) {
      console.log(err);
      
    }
  };

  return (
    <div>
      <p>{product.title}</p>
      <p>Price: {product.price}</p>
      <p>Description: {product.description}</p>
      <Link to={"/products/" + id + "/edit"}>
        Edit
      </Link>
      <button onClick={deleteproduct}>Delete</button>
    </div>
  );
};

export default ProductDetail;