import React, { useEffect, useState} from "react";
import axios from "axios";
import PersonForm from "../components/PersonForm";
import PersonList from "../components/PersonList";

export default ()=> {
  const [ message, setMessage ] = useState("Loading...")
  useEffect(()=> {
    axios.get("http://localhost:8000/api")
      .then(res=>setMessage(res.data.message))
  }, []);
  return( 
    <div>
      <PersonForm/>
      <h2>Message from the backend: {message}</h2>
    </div>
  )
}

const Main = (props) => {
  const[people, setPeople] = useState([]);
  const[loaded, setLoaded] = useState(false);

  useEffect(()=> {
    axios.get('http://localhost:8000/api/people')
      .then(res=>{
        setPeople(res.data);
        setLoaded(true);
      })
      .catch(err => console.error(err));
  },[]);
  const removeFromDom = personId => {
    setPeople(people.filter(person => person._id !== personId));
  }
  const createPerson = person => {
    axios.post('http://localhost:8000/api/person', person)
      .then(res=> {
        setPeople([...people, res.data]);
      })
  }
  return (
    <div>
      <PersonForm onSubmitProp={createPerson} initialFirstName="" initialLastName="" />
      <hr/>
      <PersonList people={people} removeFromDom={removeFromDom}/>
    </div>
  )
}
export default Main;
