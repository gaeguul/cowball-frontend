import React from 'react';
import '../../scss/component/_modal.scss';

const Modal = ({ modalClose }) => {
  return (
    <div className='modal__container'>
      <div className='modal'>
        <button className='modal__button' onClick={modalClose}>
          {' '}
          Modal Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
