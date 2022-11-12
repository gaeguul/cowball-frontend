import React from 'react';

function LogoutButton() {
  const handleButtonClick = () => {
    //logout 처리
  };

  return (
    <div className='logout-button user-button' onClick={handleButtonClick}>
      로그아웃
    </div>
  );
}

function TopMenu() {
  return (
    <div className='user-menu-container'>
      <div className='user-button-container'>
        <LogoutButton />
      </div>
    </div>
  );
}

export default TopMenu;
