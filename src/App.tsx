import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import CreateQuiz from "./pages/CreateQuiz";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="create" element={<CreateQuiz />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
