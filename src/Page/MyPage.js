import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import CustomerLayout from '../Component/CustomerLayout';
import Header from '../Component/Header';

import '../scss/MyPage.scss';
import { useCallback } from 'react';

// import axios from 'axios';
// import { NavLink } from 'react-router-dom';

const customerId = localStorage.getItem('customerId');
const customerToken = localStorage.getItem('customerToken');

function MyPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();

  const onSubmit = async () => {};

  const [userId, setUserID] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('');
  // const [userId, setUserID] = useState('');
  // const [userId, setUserID] = useState('');
  // const [userId, setUserID] = useState('');

  const getMyInfo = useCallback(async () => {
    try {
      const url = `users/${customerId}`;
      const headers = {
        headers: {
          Authorization: `Bearer ${customerToken}`,
        },
      };
      const response = await axios.get(url, headers);
      console.log('response.data', response.data);

      setUserID(response.data.userId);
    } catch (error) {
      console.log(error);
    }
  }, [customerToken]);

  useEffect(() => {
    getMyInfo();
  }, [getMyInfo]);

  // const onSubmit = async (data) => {
  //   try {
  //     await new Promise((r) => setTimeout(r, 1000));

  //     const url = `auth/customer`;

  //     const response = await axios.post(url, data);
  //     console.log(response.data.result); //access-token
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <CustomerLayout>
      <Header />
      <div className='mypage-center-container'>
        <div className='mypage-container'>
          <div className='top-title'>
            <span className='title-text'>마이페이지</span>
          </div>
          <form className='form-container' onSubmit={handleSubmit(onSubmit)}>
            <div className='input-container'>
              <label className='title' htmlFor='userId'>
                아이디
              </label>
              <input
                id='userId'
                type='text'
                name='userId'
                placeholder={userId}
                defaultValue={userId}
                aria-invalid={
                  !isDirty ? undefined : errors.userId ? 'true' : 'false'
                }
                {...register('userId', {
                  required: '아이디를 입력해주세요.',
                })}
              />
              {errors.userId && (
                <small role='alert' className='input-alert'>
                  {errors.userId.message}
                </small>
              )}
              <label className='title' htmlFor='password'>
                비밀번호
              </label>
              <input
                id='password'
                type='text'
                name='password'
                placeholder='원래아이디'
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
              <label className='title' htmlFor='name'>
                이름
              </label>
              <input
                id='name'
                type='text'
                name='name'
                placeholder='원래아이디'
                aria-invalid={
                  !isDirty ? undefined : errors.name ? 'true' : 'false'
                }
                {...register('name', {
                  required: '이름을 입력해주세요.',
                })}
              />
              {errors.name && (
                <small role='alert' className='input-alert'>
                  {errors.name.message}
                </small>
              )}
              <label className='title' htmlFor='phoneNumber'>
                전화번호
              </label>
              <input
                id='phoneNumber'
                type='number'
                name='phoneNumber'
                placeholder='원래아이디'
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
              <label className='title' htmlFor='address'>
                주소
              </label>
              <input
                id='address'
                type='text'
                name='address'
                placeholder='원래아이디'
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
              <label className='title' htmlFor='cardNumber'>
                카드번호
              </label>
              <input
                id='cardNumber'
                type='number'
                name='cardNumber'
                placeholder='원래아이디'
                aria-invalid={
                  !isDirty ? undefined : errors.cardNumber ? 'true' : 'false'
                }
                {...register('cardNumber', {
                  required: '카드번호를 입력해주세요.',
                })}
              />
              {errors.cardNumber && (
                <small role='alert' className='input-alert'>
                  {errors.cardNumber.message}
                </small>
              )}
            </div>
            <div className='bottom-container'>
              <button
                className='edit-button'
                type='submit'
                disabled={isSubmitting}
              >
                <span>수정</span>
              </button>
              <button className='exit-button'>
                <span>회원탈퇴</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </CustomerLayout>
  );
}

export default MyPage;
