import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
// import Layout from '../Component/Layout';
import '../scss/StaffLoginPage.scss';

function StaffLoginLogo() {
  return (
    <div className='staff-login-logo-container'>
      <NavLink to='/orderlist'>
        <img
          className='MrDaebakStaffLogo'
          alt='MrDaebakStaffLogo'
          src='img/MrDaebakStaffLogo.png'
        />
      </NavLink>
    </div>
  );
}

function StaffLoginForm({
  onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    console.log(JSON.stringify(data));
  },
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();

  return (
    <div className='staff-login-form-container'>
      <form className='staff-login-form' onSubmit={handleSubmit(onSubmit)}>
        <input
          className='id-input'
          id='id'
          type='text'
          name='id'
          placeholder='아이디'
          aria-invalid={!isDirty ? undefined : errors.id ? 'true' : 'false'}
          {...register('id', {
            required: '아이디는 필수 입력입니다.',
          })}
        />
        <input
          className='password-input'
          id='password'
          type='password'
          name='password'
          placeholder='비밀번호'
          aria-invalid={
            !isDirty ? undefined : errors.password ? 'true' : 'false'
          }
          {...register('password', {
            required: '비밀번호는 필수 입력입니다.',
          })}
        />
        <button type='submit' disabled={isSubmitting}>
          로그인
        </button>
        {errors.id && <small role='alert'>{errors.id.message}</small>}
        {errors.password && (
          <small role='alert'>{errors.password.message}</small>
        )}
      </form>
    </div>
  );
}

function StaffLoginBox() {
  return (
    <div className='staff-login-box'>
      <StaffLoginLogo />
      <StaffLoginForm />
    </div>
  );
}

function StaffLogin() {
  return (
    <div className='staff-login-container'>
      <StaffLoginBox />
    </div>
  );
}
function StaffLoginPage() {
  return <StaffLogin />;
}

export default StaffLoginPage;
