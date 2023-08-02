// App.jsx
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar";
import CreateAuction from "./components/CreateAuction";
import AuctionList from "./components/AuctionList";
import PrivateRoute from "./components/PrivateRoute";
import { AuthContext } from "./auth/AuthContext";
import Protected from "./components/PrivateRoute";
import AuctionDetail from "./pages/AuctionDetail/AuctionDetail";
import { ToastContainer } from "react-toastify";
import "./App.css";
import MyAuction from "./pages/MyAuction/MyAuction";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="container m-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auction-detail" element={<AuctionDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/create-auction"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <CreateAuction />
            </Protected>
          }
        />
        <Route
          path="/my-auction"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <MyAuction />
            </Protected>
          }
        />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
