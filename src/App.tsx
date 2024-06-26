import React from 'react';
import { Route, Routes } from 'react-router-dom';

import SearchProvider from './components/SearchContext/SearchContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import CreateQuiz from './pages/CreateQuiz';
import TakeTheQuiz from './pages/TakeTheQuiz';
import Results from './pages/Results';
import EditQuiz from './pages/EditQuiz';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <SearchProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="create" element={<CreateQuiz />} />
          <Route path="take-quiz/:id" element={<TakeTheQuiz />} />
          <Route path="results/:id" element={<Results />} />
          <Route path="edit/:id" element={<EditQuiz />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SearchProvider>
  );
}

export default App;
