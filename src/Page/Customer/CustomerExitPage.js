import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import CustomerLayout from '../../Component/CustomerLayout';
import Header from '../../Component/Header';
import { AuthContext } from '../../Context/AuthContext';

import '../../scss/CustomerExitPage.scss';

function CustomerExitForm() {
  const customerId = localStorage.getItem('customerId');
  const customerToken = localStorage.getItem('customerToken');

  const value = useContext(AuthContext);
  const setIsCustomerLogin = value.setIsCustomerLogin;

  const [userInfo, setUserInfo] = useState({});

  const getUserInfo = async () => {
    try {
      const url = `users/${customerId}`;
      const headers = {
        headers: {
          Authorization: `Bearer ${customerToken}`,
        },
      };

      const response = await axios.get(url, headers);
      console.log(response.data);
      setUserInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleExitButtonClick = async () => {
    try {
      const url = `users/${customerId}`;
      const headers = {
        headers: {
          Authorization: `Bearer ${customerToken}`,
        },
      };

      const response = await axios.delete(url, headers);
      console.log(response.data);
      localStorage.clear();
      setIsCustomerLogin(false);
      alert('회원탈퇴가 완료되었습니다.');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='center-container'>
      <div className='exit-container'>
        <div className='top-title'>
          <span className='title-text'>회원을 탈퇴하시겠습니까?</span>
        </div>
        <div className='exit-info-container'>
          <div className='info-title'>아이디</div>
          <div className='info-content'>{userInfo.userId}</div>
          <div className='info-title'>주문횟수</div>
          <div className='info-content'>{userInfo.orderCount}회</div>
        </div>
        <div className='bottom-container'>
          <NavLink to='/'>
            <div className='cancel-button'></div>
            취소
          </NavLink>
          <button className='exit-button' onClick={handleExitButtonClick}>
            <span>회원탈퇴</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function CustomerExitPage() {
  return (
    <CustomerLayout>
      <Header />
      <CustomerExitForm />
    </CustomerLayout>
  );
}

export default CustomerExitPage;
