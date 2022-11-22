import React from 'react';
import '../../scss/component/_modal.scss';

const Modal = ({ modalClose }) => {
  return (
    <div className='modal-container' onClick={modalClose}>
      <div className='modal'>
        <div className='button-container'>
          <button className='modal-button' onClick={modalClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
