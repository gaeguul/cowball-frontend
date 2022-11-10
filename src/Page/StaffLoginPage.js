import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import '../scss/StaffLoginPage.scss';

function StaffLoginLogo() {
  return (
    <div className='staff-login-logo-container'>
      <NavLink to='/stafflogin'>
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
          id='id'
          type='text'
          name='id'
          placeholder='아이디'
          aria-invalid={!isDirty ? undefined : errors.id ? 'true' : 'false'}
          {...register('id', {
            required: '아이디를 입력해주세요.',
          })}
        />
        {errors.id && (
          <small role='alert' className='input-alert'>
            {errors.id.message}
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
