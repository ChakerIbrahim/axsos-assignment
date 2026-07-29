import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import MessageForm from '../MessageForm'
import MessageDisplay from '../MessageDisplay'

function App() {
  const [currentMsg, setCurrentMsg] = useState("there are no messages");

  const youveGotMail = ( newMessage) => {
    setCurrentMsg(newMessage);
  }

  return (
    <>
      <MessageForm  onNewMessage={youveGotMail}/>
      <MessageDisplay message={currentMsg} />
    </>
  );
}

export default App
