import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './components/header'
import Title from './components/Title'
import List from './components/List'


function App() {
  return(
    <>
    <Header text={"Hello Dojo!"}/>
    <Title text={"Things I need to do:"}/>
    <List items={["Learn react", "Climb Mnt Everest", "Run a marathon"]}></List>
    </>

  ) 

}

export default App
