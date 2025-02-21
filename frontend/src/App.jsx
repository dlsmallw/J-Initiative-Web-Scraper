import React from 'react';
import { HashRouter, BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';

// Components
import NavBar from './components/NavBar';
import Home from './components/Home';
//import ScrapePage from './components/Scrape';
//<Route path="/scrape" element={<ScrapePage />} />
import AnnotationPage from './components/Annotation';
import DatabasePage from './components/Database';
import AboutPage from './components/About';
import LogPage from './components/Log';

const isDev = import.meta.env.MODE === 'development';

function AppLayout() {
  const location = useLocation();
  console.log('Current location:', location);
  // Since the scraping functionality is handled externally, we always show the NavBar.
  const hideNav = false;

  return (
    <>
      {!hideNav && <NavBar />}
      <div className="container-fluid" style={{ marginTop: hideNav ? '0' : '60px' }}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/annotation" element={<AnnotationPage />} />
          <Route path="/database" element={<DatabasePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/logs" element={<LogPage />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  const RouterToUse = isDev ? BrowserRouter : HashRouter;
  return (
    <RouterToUse>
      <AppLayout />
    </RouterToUse>
  );
}



