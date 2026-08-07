import { useState } from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import ProductForm from "./pages/ProductForm";

function App() {
  return (
    <Routes>
      <Route path='/' element={<ProductForm/>}/>
    </Routes>
  )
}

export default App
