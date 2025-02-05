// src/App.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'


import NavBar from './components/NavBar';
import Home from './components/Home';

export default function App() {
  console.log('React is mounted')

  return (
    <>
      <NavBar />
      <div className="container-fluid mt-4">
          <Home/>
      </div>
    </>
  )
}


