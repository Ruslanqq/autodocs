import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Reques from "./components/Reques/Reques";
import Login from "./components/Login";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reques" element={<Reques />} />
      </Routes>
    </>
  );
};

export default App;
