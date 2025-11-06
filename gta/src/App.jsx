// gta/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./components/HomePage"; // your main page
// import ChatbotPage from "./components/ChatbotPage";
import ChatBot from "./components/ChatBot/ChatBot";

import Home from "./SecondComponents/Home";
import Login from "./components/login/login";
import Signup from "./components/Signup/Signup";
import EnquiryForm from "./components/Enquiry/Enquiry";
import NeonGlassChatbot from "./components/Help/Help";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Enquiry" element={<EnquiryForm />} />
        <Route path="/Help" element={<NeonGlassChatbot/>} />
      </Routes>
    </Router>


   

    </>
  );
}

export default App;
