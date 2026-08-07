import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";
import PersonForm from '../components/PersonForm';

module.exports.updatePerson = (request, response) => {
    Person.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedPerson => response.json(updatedPerson))
        .catch(err => response.json(err))
}
    
const Update = (props) => {
    const { id } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/people/' + id)
            .then(res => {
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
            })
    }, []);
    
    const updatePerson = e => {
        e.preventDefault();
        axios.patch('http://localhost:8000/api/people/' + id, {
            firstName,
            lastName
        })
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }

    const {id} = props;
    const[person, setPerson] = useState();
    const[loaded, setLoaded] = useState(false);

    useEffect(()=> {
        axios.get('http://localhost:8000/api/person/' + id)
            .then(res => {
                setPerson(res.data);
                setLoaded(true);
            })
    }),[])
    const updatedPerson = person => {
        axios.put('http://localhost:8000/api/person/' + id, person)
         .then(res=> console.log(res));
    }
    
    return (
        {loaded && (
            <PersonForm
                onSubmitprop={updatePerson}
                initialFirstName={person.firstName}
                initialLastName={person.lastName}
                />
        )}
        <div>
            <h1>Update a Person</h1>
            <form onSubmit={updatePerson}>
                <p>
                    <label>First Name</label><br />
                    <input type="text" 
                    name="firstName" 
                    value={firstName} 
                    onChange={(e) => { setFirstName(e.target.value) }} />
                </p>
                <p>
                    <label>Last Name</label><br />
                    <input type="text" 
                    name="lastName"
                    value={lastName} 
                    onChange={(e) => { setLastName(e.target.value) }} />
                </p>
                <input type="submit" />
            </form>
        </div>
    )
}
    
export default Update;

