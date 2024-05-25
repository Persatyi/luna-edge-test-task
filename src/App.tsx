import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import CreateQuiz from "./pages/CreateQuiz";
import TakeTheQuiz from "./pages/TakeTheQuiz";
import Results from "./pages/Results";
import EditQuiz from "./pages/EditQuiz";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="create" element={<CreateQuiz />} />
          <Route path="take-quiz/:id" element={<TakeTheQuiz />} />
          <Route path="results/:id" element={<Results />} />
          <Route path="edit/:id" element={<EditQuiz />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
