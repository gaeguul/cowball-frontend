import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { initSocketNetworkForStaff } from '../../utils/alarmToast';
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';

const staffSocket = io(
  'http://ec2-3-38-99-75.ap-northeast-2.compute.amazonaws.com:8000/staff',
);

function StaffLayout({ children }) {
  useEffect(() => {
    return initSocketNetworkForStaff(staffSocket);
  }, []);

  return (
    <div className='layout-container'>
      {children}
      <ToastContainer />
    </div>
  );
}

export default StaffLayout;
