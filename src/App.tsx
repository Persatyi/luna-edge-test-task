import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import CreateQuiz from "./pages/CreateQuiz";
import TakeTheQuiz from "./pages/TakeTheQuiz";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="create" element={<CreateQuiz />} />
          <Route path="take-quiz/:id" element={<TakeTheQuiz />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
