import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import SignupForm from "./Components/SignupForm";
import ResetPasswordForm from "./Components/ResetPasswordForm";
import HomePage from "./Components/HomePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
      </Routes>
    </Router>
  );
};

export default App;
