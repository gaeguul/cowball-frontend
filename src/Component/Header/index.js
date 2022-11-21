import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { HiMicrophone } from 'react-icons/hi';
import ReactModal from 'react-modal';

function Header() {
  const value = useContext(AuthContext);
  const setIsCustomerLogin = value.setIsCustomerLogin;
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  // const setCustomerToken = value.setCustomerToken;

  const handleMikeButtonClick = () => {
    console.log(`handleMikeButtonClick`);
    setIsVoiceModalOpen(true);
  };

  const handleLogoutButtonClick = () => {
    localStorage.clear();
    setIsCustomerLogin(false);
    // setCustomerToken(null);
  };

  return (
    <div className='header-container'>
      {isVoiceModalOpen ? (
        <ReactModal isOpen={isVoiceModalOpen}></ReactModal>
      ) : null}

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
          <div
            className='mike-button-container'
            onClick={handleMikeButtonClick}
          >
            <HiMicrophone clssName='mike-button' />
          </div>
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
