// App.jsx
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar";
import CreateAuction from "./components/CreateAuction";
import AuctionList from "./components/AuctionList";
import PrivateRoute from "./components/PrivateRoute";
import { AuthContext } from "./auth/AuthContext";
import Protected from "./components/PrivateRoute";

function App() {

  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className="container m-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <PrivateRoute path="/create-auction" element={<CreateAuction />} />
        <PrivateRoute path="/auction-list" element={<AuctionList />} /> */}
        <Route
            path="/create-auction"
            element={
              <Protected isSignedIn={isLoggedIn}>
                <CreateAuction />
              </Protected>
            }
          />
      </Routes>
    </div>
  );
}

export default App;
