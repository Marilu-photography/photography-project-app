import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './views/Home/Home'
import Editor from './views/Editor/Editor'
import ProductDetails from './views/ProductDetails/ProductDetails'
import { useAuthContext } from './contexts/AuthContext'
import Login from './views/Login/Login'
import Register from './views/Register/Register'

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

function App() {

  const { isAuthenticationFetched } = useAuthContext();

  return (
    <>
    <Navbar/>
    {!isAuthenticationFetched ? (
        <p>Loading...</p>
      ) : (
        <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" element = { <ProtectedRoute/>}>
          <Route path="/editor" element={<Editor />} />
        </Route>

      </Routes>
      )}
      
        
      
    </>
  )
}

export default App
