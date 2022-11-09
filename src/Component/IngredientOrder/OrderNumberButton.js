import React from 'react';
import { BiPlus, BiMinus } from 'react-icons/bi';

function OrderNumberButton() {
  return (
    <div className='order-number-button-container'>
      <div className='order-number-button'>
        <div className='button-container'>
          <BiMinus className='button' />
        </div>
        <div className='number'>10</div>
        <div className='button-container'>
          <BiPlus className='button' />
        </div>
      </div>
    </div>
  );
}

export default OrderNumberButton;
