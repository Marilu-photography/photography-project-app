import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './componets/Navbar/Navbar'
import Home from './views/Home/Home'
import Editor from './views/Editor/Editor'

function App() {


  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/editor" element={ <Editor />} />

      </Routes>
        
      
    </>
  )
}

export default App
