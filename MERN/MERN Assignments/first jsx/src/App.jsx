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
      {/* Main heading — the text is sent in through the "text" prop */}
      <Header text={"Hello Dojo!"} />
      {/* Subheading above the list */}
      <Title text={"Things I need to do:"} />
      {/* To-do list — the array is sent in through the "items" prop */}
      <List items={["Learn react", "Climb Mnt Everest", "Run a marathon"]} />
    </>
  )
}

export default App