import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import SignupForm from "./Components/SignupForm";
import ResetPasswordForm from "./Components/ResetPasswordForm";
import HomePage from "./Components/HomePage";
import Dashboard from "./Components/Dashboard";
import UserPage from "./Components/UserPage";
import { Contracts } from "./pages/Contracts";
import { Products } from "./pages/Products";
import { Vendors } from "./pages/Vendors";
import { Settings } from "./pages/Settings";
import { Profile } from "./pages/Profile";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/user" element={<UserPage/>} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="products" element={<Products />} />
          <Route path="contracts" element={<Contracts />} />
      </Routes>
    </Router>
  );
};

export default App;
