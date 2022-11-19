import axios from 'axios';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import '../scss/CustomerLoginPage.scss';

import { AuthContext } from '../Context/AuthContext';

function CustomerLoginLogo() {
  return (
    <div className='customer-login-logo-container'>
      <NavLink to='/login'>
        <img
          className='MrDaebakLogo'
          alt='MrDaebakLogo'
          src='/img/MrDaebakLogo.png'
        />
      </NavLink>
    </div>
  );
}

function CustomerLoginForm() {
  /**상태관리 */
  const value = useContext(AuthContext);
  const setIsCustomerLogin = value.setIsCustomerLogin;
  const setCustomerToken = value.setCustomerToken;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await new Promise((r) => setTimeout(r, 1000));

      const url = `auth/users`;
      const response = await axios.post(url, data);
      console.log(response.data['access-token']); //access-token

      setIsCustomerLogin(true);
      setCustomerToken(response.data['access-token']);
    } catch (error) {
      console.log(error);
      alert('아이디 또는 비밀번호를 다시 입력해주세요.');
    }
  };

  return (
    <div className='customer-login-form-container'>
      <form className='customer-login-form' onSubmit={handleSubmit(onSubmit)}>
        <input
          id='customerId'
          type='text'
          name='customerId'
          placeholder='아이디'
          aria-invalid={
            !isDirty ? undefined : errors.customerId ? 'true' : 'false'
          }
          {...register('customerId', {
            required: '아이디를 입력해주세요.',
          })}
        />
        {errors.customerId && (
          <small role='alert' className='input-alert'>
            {errors.customerId.message}
          </small>
        )}
        <input
          id='password'
          type='password'
          name='password'
          placeholder='비밀번호'
          aria-invalid={
            !isDirty ? undefined : errors.password ? 'true' : 'false'
          }
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
          })}
        />
        {errors.password && (
          <small role='alert' className='input-alert'>
            {errors.password.message}
          </small>
        )}
        <button type='submit' disabled={isSubmitting}>
          로그인
        </button>
      </form>
    </div>
  );
}

function ButtomNav() {
  return (
    <div className='buttom-nav-container'>
      <NavLink to='/signup'>회원가입</NavLink>
      <NavLink to='/stafflogin'>직원 로그인</NavLink>
    </div>
  );
}

function CustomerLoginBox() {
  return (
    <div className='customer-login-box'>
      <CustomerLoginLogo />
      <CustomerLoginForm />
      <ButtomNav />
    </div>
  );
}

function CustomerLoginPage() {
  return (
    <div className='customer-login-container'>
      <CustomerLoginBox />
    </div>
  );
}

export default CustomerLoginPage;
