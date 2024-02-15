import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./components/routePage/Profile";
import Layout from "./pages/Layout";
import Home from "./components/routePage/Home";
import FriendProfile from "./components/common/FriendProfile";
import TweetPage from "./components/common/TweetPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/Home" replace />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/friendprofile/:id" element=<FriendProfile /> />
          <Route path="/tweetpage/:id" element={<TweetPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
