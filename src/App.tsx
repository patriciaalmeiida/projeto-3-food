import React from 'react';
import './App.css';

import Beer from './Components/Beer/beer'
import Food from './Components/Foods/foods'

function App() {
  return (
    <div className="App">
      <Food />
      <Beer />
    </div>
  );
}


export default App;