import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import Board from './Board'
import Main from './Main'


function App() {


  return (
    <>
      <div className="App">
        <div className="border_top">
          <h2 className="title">Trello</h2>
        </div>
        <div className="container_boards">
          <Main />
        </div>
      </div>
    </>
  );
}

export default App;
