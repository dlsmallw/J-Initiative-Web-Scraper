import React from 'react'
import { HashRouter, BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'

// Your components
import NavBar from './components/NavBar'
import Home from './components/Home'
import ScrapePage from './components/Scrape'
//import ScrapeWindow from "./components/ScrapeWindow";
// <Route path="/scrape" element={<ScrapeWindow />} />
import AnnotationPage from './components/Annotation'
import DatabasePage from './components/Database'
import AboutPage from './components/About'
import LogPage from './components/Log'

// A simple helper to detect dev vs. production
const isDev = import.meta.env.MODE === 'development'


export default function App() {
  console.log('React is mounted')

  // Pick the router to use
  const RouterToUse = isDev ? BrowserRouter : HashRouter

  return (
    <RouterToUse>
      <NavBar />
      <div className="container-fluid" style={{ marginTop: '60px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scrape" element={<ScrapePage />} />

          <Route path="/annotation" element={<AnnotationPage />} />
          <Route path="/database" element={<DatabasePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/logs" element={<LogPage />} />
        </Routes>
      </div>
    </RouterToUse>
  )
}



