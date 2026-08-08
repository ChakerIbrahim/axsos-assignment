import { Route, Routes } from 'react-router-dom'
import ProductList from "./pages/ProductList";
import ProductDetail from './pages/ProductDetail';
import ProductUpdate from './pages/ProductUpdate';

function App() {
  return (
    <Routes>
      <Route path='/' element={<ProductList/>}/>
      <Route path='/products/:id' element={<ProductDetail/>}/>
      <Route path='/products/:id/edit' element={<ProductUpdate/>}/>
    </Routes>
  );
}

export default App