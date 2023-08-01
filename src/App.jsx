// src/App.js
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar";
import CreateAuction from "./components/CreateAuction";
// import Login from "./pages/Login";
// import Register from "./pages/Register";

function App() {
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-auction" element={<CreateAuction />} />
        
      </Routes>
    </div>
  );
}

export default App;
