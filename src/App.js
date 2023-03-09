import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='register' element={<Register />} />
        <Route exact path='' element={<Login />} />
        <Route exact path='home' element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App;