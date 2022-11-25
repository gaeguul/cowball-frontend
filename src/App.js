import './App.css';
import React from 'react';
import Router from './Routes';
import { ContextProvider } from './Context/AuthContext.js';

function App() {
  return (
    <ContextProvider>
      <div className='App'>
        <Router />
      </div>
    </ContextProvider>
  );
}

export default App;
