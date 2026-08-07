import React, {useState, useEffect} from "react";
import io from 'socket.io-client';
import Main from "./views/Main";
import { Routes, Route } from "react-router-dom";
import Detail from "./views/Details";
import Update from "./views/Update";

function App() {
  return (
        <div className="App">
          <Routes>
            <Route element={<Main/>} path="/people"/>
            <Route element={<Detail/>} path="/people/:id" />
            <Route element={<Update/>} path="/people/:id/edit"/>
          </Routes>
        </div>
  );
}

export default App;

function App() {
  const[socket]=useState(() => io(':8000'));

  useEffect(() => {
    console.log('Is this running?');
    socket.on('Welcome', data => console.log(data));

    return() => socket.removeAllListeners;
  }, [socket]);

  return(
    <div className="App">
      <h1>Socket test</h1>
    </div>
  );
}
export default App;