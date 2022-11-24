import React from 'react';

import { toast } from 'react-toastify';
import { NewOrderToastContent } from '../Component/Toast/NewOrderToast';

const showNewOrderToast = (order) =>
  toast(<NewOrderToastContent order={order} />, {
    autoClose: 15000,
    position: 'top-right',
    progress: undefined,
    hideProgressBar: true,
  });

export function initSocketNetworkForStaff(socket) {
  console.log('init socket', socket);

  socket.on('NEW_ORDER', showNewOrderToast);

  return () => {
    socket.off('NEW_ORDER');
  };
}
