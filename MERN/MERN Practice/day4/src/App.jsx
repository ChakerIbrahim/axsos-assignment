import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import React, { useState } from 'react';
import MyNewComponent from './components/MyNewComponent';

function App() {
  return (
    <button 
    onClick={() => alert("This button has been clicked!")}>
      Click Me
    </button>
  )
}

export default App;

const Counter = (props) => {
  const [state, setState] = useState({clickCount: 0 });

  return (
    <div>{state.clickCount}</div>
  );
}

export default Counter;

const Counter =(props) => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count +1);
  }

  return (
    <div>
      {count}
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

const [state, setState] = useState({name: ""})

const onClick = () => {
  setState({name: "Scary Terry"})
}

console.log(state.name);


const [user, setUser] = useState({
  name: "",
  age: 0,
  skills: [],
})


const handleNameChange = (event) => {
  setUser({...user, name: event.target.value})
}

const [name, setName] = useState("");
const onClick = () => {
  setName("Scary Terry")
}

console.log(name);

function App() {
  return (
    <div className='App'>
      <MyNewComponent header={ "Header Prop" }>
        <h1>These are children</h1>
        <p>This is another child</p>
        <p>This is even another child</p>
      </MyNewComponent>
    </div>
  );
}
export default App;