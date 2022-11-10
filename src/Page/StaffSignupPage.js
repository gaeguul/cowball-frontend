import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import '../scss/StaffSignupPage.scss';

function StaffSignupForm({
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
    <div className='staff-signup-form-container'>
      <form className='staff-signup-form' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='name'>이름</label>
        <input
          id='name'
          type='text'
          name='name'
          placeholder='이름'
          aria-invalid={!isDirty ? undefined : errors.name ? 'true' : 'false'}
          {...register('name', {
            required: '이름을 입력해주세요.',
          })}
        />
        {errors.name && (
          <small role='alert' className='input-alert'>
            {errors.name.message}
          </small>
        )}
        <label htmlFor='id'>아이디</label>
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
        <label htmlFor='password'>비밀번호</label>
        <input
          id='password'
          type='text'
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
        <label htmlFor='number'>전화번호</label>
        <input
          id='number'
          type='number'
          name='number'
          placeholder='전화번호'
          aria-invalid={!isDirty ? undefined : errors.number ? 'true' : 'false'}
          {...register('number', {
            required: '전화번호를 입력해주세요.',
          })}
        />
        {errors.number && (
          <small role='alert' className='input-alert'>
            {errors.number.message}
          </small>
        )}
        <div className='signup-button-container'>
          <button
            className='signup-button'
            type='submit'
            disabled={isSubmitting}
          >
            직원 회원가입 신청하기
          </button>
        </div>
      </form>
    </div>
  );
}

function StaffSignupPage() {
  return (
    <div className='staff-signup-container'>
      <div className='staff-signup-box'>
        <div className='staff-login-logo-container'>
          <NavLink to='/stafflogin'>
            <img
              className='MrDaebakStaffLogo'
              alt='MrDaebakStaffLogo'
              src='img/MrDaebakStaffLogo.png'
            />
          </NavLink>
        </div>
        <StaffSignupForm />
      </div>
    </div>
  );
}

export default StaffSignupPage;
