import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'

const routes = (
  <Router>
    <Routes>
      <Route path="/Home" exact elemet={<Home />} />
       <Route path="/Login" exact elemet={<Login />} />
        <Route path="/Signup" exact elemet={<Signup />} />
      </Routes>
  </Router>
);


const App = () => {
  return (<>
  
 <Login />
  </>)
  
}

export default App