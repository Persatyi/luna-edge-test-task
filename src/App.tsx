import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import CreateQuiz from "./pages/CreateQuiz";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="create" element={<CreateQuiz />} />
      </Routes>
    </>
  );
}

export default App;
