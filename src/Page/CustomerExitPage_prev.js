import React from 'react';
import { NavLink } from 'react-router-dom';
import CustomerLayout from '../Component/CustomerLayout';
import Header from '../Component/Header';

import '../scss/CustomerExitPage.scss';

function CustomerExitPage() {
  return (
    <CustomerLayout>
      <Header />
      <div className='center-container'>
        <div className='exit-container'>
          <div className='top-title'>
            <span className='title-text'>회원을 탈퇴하시겠습니까?</span>
          </div>
          <div className='exit-info-form'>
            <div className='info-title'>아이디</div>
            <div className='info-content'>sogong1234</div>
            <div className='info-title'>주문횟수</div>
            <div className='info-content'>10회</div>
          </div>
          <div className='exit-button'>
            <button type='submit'>회원탈퇴</button>
          </div>
          <div className='buttom-nav-container'>
            <NavLink to='/'>취소</NavLink>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}

export default CustomerExitPage;
