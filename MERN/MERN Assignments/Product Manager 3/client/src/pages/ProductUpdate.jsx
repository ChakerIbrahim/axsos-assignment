import React,{ useEffect, useState} from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


const ProductUpdate = (props)=> {
  const{id}= useParams();
  const[title, setTitle]= useState("");
  const[price, setPrice]= useState("");
  const[description, setDescription]= useState("");
  const navigate = useNavigate();


  const getProduct = async ()=> {
    try{
      const res = await axios.get("http://localhost:8000/api/products/" + id);
      setTitle(res.data.title);
      setPrice(res.data.price);
      setDescription(res.data.description);
    }catch(err){
      console.log(err);
      
    }
  }

  useEffect(()=>{
    getProduct();
  },[]);


  const updateProduct = async e => {
    e.preventDefault();

    try {
      const res = await axios.patch("http://localhost:8000/api/products/" + id, {
        title,
        price,
        description
      });
      navigate("/products/" + id);
      
    }catch(err) {
      console.error(err);
      
    }
  }

  return (
    <div>
      <h1>Update a Product</h1>
      <form onSubmit={updateProduct}>
        <p>
          <label>Product Title</label><br />
          <input type="text" name="title" value={title} onChange={(e)=> {setTitle(e.target.value)}}/>
        </p>
        <p>
          <label>Product Price</label><br />
          <input type="number" name="price" value={price} onChange={(e)=> {setPrice(e.target.value)}}/>
        </p>
        <p>
          <label>Product Description</label><br />
          <input type="text" name="description" value={description} onChange={(e)=> {setDescription(e.target.value)}}/>
        </p>
        <input type="submit" value="Update" />
      </form>
    </div>
  )
}
export default ProductUpdate;