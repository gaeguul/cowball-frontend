import React, { useRef } from 'react';
import '../../scss/component/_modal.scss';

function Modal({ setModalOpen }) {
  const closeModal = () => {
    setModalOpen(false);
  };
  const modalEl = useRef();

  return (
    <div className='modal-container' ref={modalEl}>
      <div className='modal'>
        <div className='button-container'>
          <button className='modal-button' onClick={closeModal}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
