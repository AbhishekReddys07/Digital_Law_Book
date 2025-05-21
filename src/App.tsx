import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { JurisdictionPage } from './pages/JurisdictionPage';
import { ActPage } from './pages/ActPage';
import { SearchPage } from './pages/SearchPage';
import { LoginPage } from './pages/LoginPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { AnnotationsPage } from './pages/AnnotationsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/laws" element={<HomePage />} />
        <Route path="/laws/:jurisdictionId" element={<JurisdictionPage />} />
        <Route path="/acts/:actId" element={<ActPage />} />
        <Route path="/acts/:actId/:sectionId" element={<ActPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/annotations" element={<AnnotationsPage />} />
      </Routes>
    </Router>
  );
}

export default App;