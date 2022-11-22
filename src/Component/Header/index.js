import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { HiMicrophone } from 'react-icons/hi';
//import ReactModal from 'react-modal';
import Modal from 'react-awesome-modal';
import '../../scss/component/_modal.scss';

function Header() {
  const value = useContext(AuthContext);
  const setIsCustomerLogin = value.setIsCustomerLogin;
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // const setCustomerToken = value.setCustomerToken;

  // const handleMikeButtonClick = () => {
  //   console.log(`handleMikeButtonClick`);
  //   setIsVoiceModalOpen(true);
  // };

  const handleLogoutButtonClick = () => {
    localStorage.clear();
    setIsCustomerLogin(false);
    // setCustomerToken(null);
  };

  return (
    <div className='header-container'>
      {/* {isVoiceModalOpen ? <Modal isOpen={isVoiceModalOpen}></Modal> : null} */}

      <div className='header-inner'>
        <div className='logo-container'>
          <NavLink to='/'>
            <img
              className='mrdaebak-logo'
              alt='mrdaebak-logo'
              src='/img/MrDaebakLogo.png'
            />
          </NavLink>
        </div>
        <div className='user-menu-container'>
          <div className='mike-button-container' onClick={showModal}>
            <HiMicrophone clssName='mike-button' />
          </div>
          {modalOpen && <Modal setModalOpen={showModal} />}
          <Modal
            visible={modalOpen}
            effect='fadeInDown'
            onClickAway={closeModal}
          >
            <div className='modal-container'>
              <div className='top-title'>
                <span className='title-text'>음성 주문</span>
              </div>
              <div className='bottom-container'>
                <button className='cancel-button' onClick={closeModal}>
                  <span>닫기</span>
                </button>
                <button className='order-button'>
                  <span>주문</span>
                </button>
              </div>
            </div>
          </Modal>
          <div className='user-button'>
            <NavLink to='/cart'>Cart</NavLink>
          </div>
          <div className='user-button'>
            <NavLink to='/myorder'>MyOrder</NavLink>
          </div>
          <div className='user-button'>
            <NavLink to='/mypage'>MyPage</NavLink>
          </div>
          <div
            className='user-button logout-button'
            onClick={handleLogoutButtonClick}
          >
            <div>Logout</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
