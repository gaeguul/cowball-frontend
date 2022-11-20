import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import '../scss/StaffSignupPage.scss';

function StaffSignupForm() {
  const [role, setRole] = useState('');

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();

  const handleRoleClick = (event) => {
    console.log('event.target.value', event.target.value);
    setRole(event.target.value);
  };

  const onSubmit = async (data) => {
    try {
      data.role = role;
      console.log('data', data);

      await new Promise((r) => setTimeout(r, 1000));
      const url = `staff`;
      const response = await axios.post(url, data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

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
        <label htmlFor='staffId'>아이디</label>
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
        <label htmlFor='phoneNumber'>전화번호</label>
        <input
          id='phoneNumber'
          type='number'
          name='phoneNumber'
          placeholder='전화번호'
          aria-invalid={
            !isDirty ? undefined : errors.phoneNumber ? 'true' : 'false'
          }
          {...register('phoneNumber', {
            required: '전화번호를 입력해주세요.',
          })}
        />
        {errors.phoneNumber && (
          <small role='alert' className='input-alert'>
            {errors.phoneNumber.message}
          </small>
        )}
        <p className='role-title'>지원역할</p>
        <div className='role-container' onChange={handleRoleClick}>
          <label>
            <input
              type='radio'
              name='role'
              id='delivery'
              value='PENDING_DELIVERY'
            />
            배달
          </label>
          <label>
            <input type='radio' name='role' id='cook' value='PENDING_COOK' />
            조리
          </label>
        </div>
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
              src='/img/MrDaebakStaffLogo.png'
            />
          </NavLink>
        </div>
        <StaffSignupForm />
      </div>
    </div>
  );
}

export default StaffSignupPage;
