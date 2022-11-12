import React from 'react';
import CustomerLayout from '../Component/CustomerLayout';
import Header from '../Component/Header';
import '../scss/MainPage.scss';

function MainPage() {
  const handleDinnerClick = () => {};

  return (
    <CustomerLayout>
      <Header />
      <div className='main-container'>
        <div className='dinner-list-container'>
          <div className='dinner' onClick={handleDinnerClick}>
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
    </CustomerLayout>
  );
}

export default MainPage;
