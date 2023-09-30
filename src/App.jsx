import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './componets/Navbar/Navbar'
import Home from './views/Home/Home'
import ProductDetails from './views/ProductDetails/ProductDetails'

function App() {


  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/:id" element={<ProductDetails />} />

      </Routes>
        
      
    </>
  )
}

export default App
