import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './componets/Navbar/Navbar'
import Home from './views/Home/Home'

function App() {


  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={ <Home />} />

      </Routes>
        
      
    </>
  )
}

export default App
