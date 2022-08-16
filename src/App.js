import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Request from "./components/Reques/Reques";
import Login from "./components/Login";
import Companies from "./components/companies/companies";
import Profile from "./components/profile";
import AdminReq from "./components/adminReq/adminReq";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reques" element={<Request />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/adminReq" element={<AdminReq/>}/>
        <Route path="/companies" element={<Companies />} />
      </Routes>
    </>
  );
};

export default App;
