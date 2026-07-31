import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import React from 'react';
import { useParams } from "react-router";
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useNavigate } from 'react-router';
// import './App.css'


// const Home = (props) => {
//   return (
//     <div>
//       <h1 style={{color: "red"}}>Home Component</h1>
//       <Link to={"/about"}>Go to About </Link>
//     </div>
//   );
// }

// const About = (props) => {
//   return (
//   <div>
//     <h1 style={{color: "blue"}}>About Component</h1>
//     <Link to={"/"}>Go Home</Link> 
//   </div>
//   );
// }

// function App() {
//   return(
//     <div>
//       <h1>Routing Example</h1>
//       <Routes>
//         <Route path="/about" element={<About />}/>
//         <Route path="/" element={<Home />}/>
//       </Routes>
//     </div>
//   );
// }

// export default App




const Location =(props) => {
  return (
    <h1>Location Component Loaded!</h1>
  );
}

function App() {
  return(
    <div>
      <p>
        <Link to="/location/seattle">Seattle</Link>
        |
        <Link to="/location/chicago">Chicago</Link>
        |
        <Link to="/location/burbank">Burbank</Link>
      </p>
      <Routes>
        <Route path="/location/:city" element={<Location/>}/>
      </Routes>
    </div>
  );
}
export default App;

const Location = (props) => {
  const {city} = useParams();

  return(
    <h1>Welcome to {city}!</h1>
  );
}


const Survey = (props) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const sendSurvey = (e) => {
    e.preventDefault();

    navigate("/results");
    navigate(-1)
  }

  return(
    <form onSubmit={sendSurvey} >
      <label>Your Name:</label>
      <input type="text" onChange={(e) => setName(e.target.value)} value={name}/>
      <label>Your Comment:</label>
      <textarea onChange={(e) => setComment(e.target.value)} value={comment}></textarea>
      <input type="submit" value="Submit Survey" />
    </form>
  );
}