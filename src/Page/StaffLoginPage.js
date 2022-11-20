import axios from 'axios';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import '../scss/StaffLoginPage.scss';

import { AuthContext } from '../Context/AuthContext';

function StaffLoginLogo() {
  return (
    <div className='staff-login-logo-container'>
      <NavLink to='/stafflogin'>
        <img
          className='MrDaebakStaffLogo'
          alt='MrDaebakStaffLogo'
          src='/img/MrDaebakStaffLogo.png'
        />
      </NavLink>
    </div>
  );
}

function StaffLoginForm() {
  /**상태관리 */
  const value = useContext(AuthContext);
  const setIsStaffLogin = value.setIsStaffLogin;

  /** */
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await new Promise((r) => setTimeout(r, 1000));

      const url = `auth/staff`;
      const response = await axios.post(url, data);
      console.log(response.data['access-token']); //access-token

      localStorage.setItem('staffId', response.data['staffId']);
      localStorage.setItem('staffToken', response.data['access-token']);

      setIsStaffLogin(true);
    } catch (error) {
      console.log(error);
      alert('아이디 또는 비밀번호를 다시 입력해주세요.');
    }
  };

  return (
    <div className='staff-login-form-container'>
      <form className='staff-login-form' onSubmit={handleSubmit(onSubmit)}>
        <input
          id='staffId'
          type='text'
          name='staffId'
          placeholder='아이디'
          aria-invalid={
            !isDirty ? undefined : errors.staffId ? 'true' : 'false'
          }
          {...register('staffId', {
            required: '아이디를 입력해주세요.',
          })}
        />
        {errors.staffId && (
          <small role='alert' className='input-alert'>
            {errors.staffId.message}
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
      <NavLink to='/'>메인으로 이동</NavLink>
      <NavLink to='/staffsignup'>직원 회원가입</NavLink>
    </div>
  );
}

function StaffLoginBox() {
  return (
    <div className='staff-login-box'>
      <StaffLoginLogo />
      <StaffLoginForm />
      <ButtomNav />
    </div>
  );
}

function StaffLoginPage() {
  return (
    <div className='staff-login-container'>
      <StaffLoginBox />
    </div>
  );
}

export default StaffLoginPage;
