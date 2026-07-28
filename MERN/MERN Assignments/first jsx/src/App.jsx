import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
// Import our three reusable components
import Header from './components/header'
import Title from './components/Title'
import List from './components/List'

// App is the top-level component. It combines the smaller components
// and passes the text/items each one should display through props.
function App() {
  return (
    // <> </> is a Fragment: lets us return several elements without an extra <div>
    <>
    <h1>Hello Dojo!</h1>
    <p>Things I need to do</p>
    <ul>
      <li>Learn React</li>
      <li>Climb Mnt Everest</li>
      <li>Runn a Marathon</li>
      <li>Feed the Dogs</li>
    </ul>
    
    </>
  );
}

export default App