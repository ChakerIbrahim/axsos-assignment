import React, {useState} from "react";
import axios from "axios";
export default function Main() {
  const[title, setTitle]= useState("");
  const[pages, setPages] = useState(0);

  const[error, setErrors] = useState([]);
  const onSubmitHandler = e => {
    e.preventDefault();

    axios.post('http://localhost:8000/books', {
      title,
      pages
    })
    .then(res=> console.log(res))
    .catch(err=>{
      const errorResponse = err.response.data.errors;
      const errorArr= [];
      for(const key of Object.keys(errorResponse)) {
        errorArr.push(errorResponse[key].message)
      }
      setErrors(errorArr);
    })
  }
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        {errors.map((err,index) => <p key={index}>{err}</p>)}
        <p>
          <label>Title</label>
          <input type="text" onChange={e=> setTitle(e.target.value)}/>
        </p>
        <p>
          <label>Pages</label>
          <input type="text" onChange={e => setPages(e.target.value)}/>
        </p>
        <input type="submit"/>
      </form>
    </div>
  )
}