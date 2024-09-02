import 'regenerator-runtime/runtime';
import React from 'react';
import {BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';




function Home() {
    const navigate = useNavigate();
    localStorage.verify = false;

    const goToSkip = () => {
      navigate('/skip')
    }

  return (
      <header className="App-header">
        <div class='box'>
          <h2>
            <p>
              TAMU Ticket Pull Organizer
            </p>
          </h2>
          <div class='button-container'>
            <button class='custom-button' onClick={() => navigate('/join')}>
              Join Pull Group
            </button>
            <button class='custom-button' onClick={goToSkip}>
              View Pull Assignments
            </button>
          </div>
        </div>
      </header>
  );
}

export default Home;
