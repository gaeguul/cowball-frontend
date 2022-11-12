import React from 'react';
// import CustomerLayout from '../Component/CustomerLayout';
import { NavLink } from 'react-router-dom';
import '../scss/MainPage.scss';

function Header() {
  const handleLogoutButtonClick = () => {
    //logout 처리
  };

  return (
    <div className='header-container'>
      <div className='header-inner'>
        <div className='logo-container'>
          <NavLink to='/'>
            <img
              className='mrdaebak-logo'
              alt='mrdaebak-logo'
              src='img/MrDaebakLogo.png'
            />
          </NavLink>
        </div>
        <div
          className='user-menu-container
          '
        >
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

function MainPage() {
  return (
    <div className='customer-layout'>
      <Header />
      <div className='main-container'>
        <div className='dinner-list-container'>
          <div className='dinner'>
            <div className='dinner-image'>
              <img
                className='steak-image'
                alt='steak-image'
                src='img/steak2.png'
              />
            </div>
            <div className='dinner-info'>
              <div className='dinner-name-ko'>발렌타인 디너</div>
              <div className='dinner-name-en'>Valentine Dinner</div>
              <div className='dinner-detail'>
                압도적인 크기와 풍미가 가득한 토마호크 스테이크와 셰프 가니시의
                만남
              </div>
            </div>
          </div>
          <div className='dinner'>
            <div className='dinner-image'>
              <img
                className='steak-image'
                alt='steak-image'
                src='img/steak2.png'
              />
            </div>
            <div className='dinner-info'>
              <div className='dinner-name-ko'>프렌치 디너</div>
              <div className='dinner-name-en'>French Dinner</div>
              <div className='dinner-detail'>
                압도적인 크기와 풍미가 가득한 토마호크 스테이크와의 만남
              </div>
            </div>
          </div>
          <div className='dinner'>
            <div className='dinner-image'>
              <img
                className='steak-image'
                alt='steak-image'
                src='img/steak2.png'
              />
            </div>
            <div className='dinner-info'>
              <div className='dinner-name-ko'>잉글리시 디너</div>
              <div className='dinner-name-en'>English Dinner</div>
              <div className='dinner-detail'>
                압도적인 크기와 풍미가 가득한 토마호크 스테이크와 셰프 가니시의
                만남
              </div>
            </div>
          </div>
          <div className='dinner'>
            <div className='dinner-image'>
              <img
                className='steak-image'
                alt='steak-image'
                src='img/steak2.png'
              />
            </div>
            <div className='dinner-info'>
              <div className='dinner-name-ko'>샴페인 축제 디너</div>
              <div className='dinner-name-en'>Champagne Feast Dinner</div>
              <div className='dinner-detail'>
                압도적인 크기와 풍미가 가득한 토마호크 스테이크와 셰프 가니시의
                만남
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
