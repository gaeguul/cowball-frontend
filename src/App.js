import './App.css';
import React from 'react';
import Router from './Routes';
import { ContextProvider } from './Context/AuthContext.js';

import { ToastContainer } from 'react-toastify';
import { initSocketNetworkForStaff } from './utils/alarmToast';

import { io } from 'socket.io-client';

const staffSocket = io(
  'http://ec2-3-38-99-75.ap-northeast-2.compute.amazonaws.com:8000/staff',
);

import 'react-toastify/dist/ReactToastify.css';

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
