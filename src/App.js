import './App.css';
import React, { useEffect } from 'react';
import Router from './Routes';
import { ContextProvider } from './Context/AuthContext.js';

import { ToastContainer } from 'react-toastify';
import { initSocketNetworkForStaff } from './utils/alarmToast';

import { io } from 'socket.io-client';

const staffSocket = io(
  'http://ec2-3-38-99-75.ap-northeast-2.compute.amazonaws.com:80/staff',
);

import 'react-toastify/dist/ReactToastify.css';

function App() {
  useEffect(() => {
    return initSocketNetworkForStaff(staffSocket);
  }, []);

  return (
    <ContextProvider>
      <div className='App'>
        <Router />
        <ToastContainer />
      </div>
    </ContextProvider>
  );
}

export default App;
