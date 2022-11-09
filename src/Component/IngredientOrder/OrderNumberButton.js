import React, { useState } from 'react';
import { BiPlus, BiMinus } from 'react-icons/bi';

function OrderNumberButton() {
  const [orderNumber, setOrderNumber] = useState(0);

  const decreaseOrderNumber = () => {
    if (orderNumber == 0) {
      console.log('더 이상 줄일 수 없습니다');
    } else {
      setOrderNumber(orderNumber - 1);
    }
  };

  const increaseOrderNumber = () => {
    setOrderNumber(orderNumber + 1);
  };

  return (
    <div className='order-number-button-container'>
      <div className='order-number-button'>
        <div className='button-container'>
          <BiMinus className='button' onClick={decreaseOrderNumber} />
        </div>
        <div className='number'>{orderNumber}</div>
        <div className='button-container'>
          <BiPlus className='button' onClick={increaseOrderNumber} />
        </div>
      </div>
    </div>
  );
}

export default OrderNumberButton;
