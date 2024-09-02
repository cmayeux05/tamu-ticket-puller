import 'regenerator-runtime/runtime';
import React from 'react';
import {BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Join from './views/join/join';
import Home from './Home';
import Seasons from './views/seasons/seasons';
import Games from './views/games/games';
import Verify from './views/verify/verify';
import Pull from './views/pull/pull';
import PullView from './views/pullview/pullview';
import Create from './views/create/create';
import Skip from './views/skip/skip';

function App() {


  return (
    <div className="App">

      <Router>     
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/join' element={<Join />} />
          <Route path='/seasons/:id' element={<Seasons />} />
          <Route path='/games/:id/' element={<Games />} />
          <Route path='/verify/:id' element={<Verify/>} />
          <Route path='/pull/:id' element={<Pull/>} />
          <Route path='/pull-view/:id' element={<PullView />}/>
          <Route path='/pull/create/:id' element={<Create />}/>
          <Route path='/skip' element={<Skip/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
