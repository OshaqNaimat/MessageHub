import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import MainPage from "./pages/MainPage";
import OTPVerification from "./pages/OTPVerification";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<Home />} />
          <Route path="/main-page" element={<MainPage />} />
          <Route path="/OTPVerification" element={<OTPVerification />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
