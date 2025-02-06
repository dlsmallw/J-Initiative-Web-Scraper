// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';

import NavBar from './components/NavBar';
import Home from './components/Home';
import ScrapePage from './components/Scrape';
import AnnotationPage from './components/Annotation';

export default function App() {
  console.log('React is mounted');

  return (
    <Router>
      <NavBar />
      <div className="container-fluid mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scrape" element={<ScrapePage />} />
          <Route path="/annotation" element={<AnnotationPage />} />
        </Routes>
      </div>
    </Router>
  );
}



