import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import '../scss/CustomerSignupPage.scss';

function CustomerSignupForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await new Promise((r) => setTimeout(r, 1000));
      const url = `users`;
      const response = await axios.post(url, data);

      console.log(response.data);
      alert('회원가입이 완료되었습니다.');

      window.location.replace('/');
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className='customer-signup-form-container'>
      <form className='customer-signup-form' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='userName'>이름</label>
        <input
          id='userName'
          type='text'
          name='userName'
          placeholder='이름'
          aria-invalid={
            !isDirty ? undefined : errors.userName ? 'true' : 'false'
          }
          {...register('userName', {
            required: '이름을 입력해주세요.',
          })}
        />
        {errors.userName && (
          <small role='alert' className='input-alert'>
            {errors.userName.message}
          </small>
        )}
        <label htmlFor='userId'>아이디</label>
        <input
          id='userId'
          type='text'
          name='userId'
          placeholder='아이디'
          aria-invalid={!isDirty ? undefined : errors.userId ? 'true' : 'false'}
          {...register('userId', {
            required: '아이디를 입력해주세요.',
          })}
        />
        {errors.userId && (
          <small role='alert' className='input-alert'>
            {errors.userId.message}
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
        <label htmlFor='address'>주소</label>
        <input
          id='address'
          type='text'
          name='address'
          placeholder='주소'
          aria-invalid={
            !isDirty ? undefined : errors.address ? 'true' : 'false'
          }
          {...register('address', {
            required: '주소를 입력해주세요.',
          })}
        />
        {errors.address && (
          <small role='alert' className='input-alert'>
            {errors.address.message}
          </small>
        )}
        {/* <p className='role-title'>지원역할</p>
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
        </div> */}
        <div className='signup-button-container'>
          <button
            className='signup-button'
            type='submit'
            disabled={isSubmitting}
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}

function CustomerSignupPage() {
  return (
    <div className='customer-signup-container'>
      <div className='customer-signup-box'>
        <div className='customer-login-logo-container'>
          <NavLink to='/login'>
            <img
              className='MrDaebakLogo'
              alt='MrDaebakLogo'
              src='/img/MrDaebakLogo.png'
            />
          </NavLink>
        </div>
        <CustomerSignupForm />
      </div>
    </div>
  );
}

export default CustomerSignupPage;
