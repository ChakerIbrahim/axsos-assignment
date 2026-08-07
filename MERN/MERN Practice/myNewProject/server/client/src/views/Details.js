import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import DeleteButton from '../components/DeleteButton';


const Detail = (props) => {
  const[person, setPerson] = useState({})
  const {id} = useParams();

  useEffect(() => {
    axios.get('http://localhost:8000/api/people/' + id)
      .then(res => setPerson(res.data))
      .catch(err=> console.error(err));
  }, []);

  const removeFromDom =()=> {
    axios.delete('http://localhost:8000/api/people/' + id)
      .then((res)=> {
        console.log(res.data)
      })
      .catch((err) => console.log(err))
  }

  return (
    <div>
      <p>First Name: {person.firstName}</p>
      <p>last Name: {person.lastName}</p>
      <DeleteButton sucessCallback={removeFromDom}/>
    </div>
  )
}
export default Detail;

