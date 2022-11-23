import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import CustomerLayout from '../Component/CustomerLayout';
import Header from '../Component/Header';

import '../scss/MyPage.scss';
import { NavLink } from 'react-router-dom';

function MyPage() {
  const customerId = localStorage.getItem('customerId');
  const customerToken = localStorage.getItem('customerToken');

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();

  const [userId, setUserId] = useState(null);
  const [address, setAddress] = useState(null);
  const [cardNumber, setCardNumber] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [name, setName] = useState(null);

  const getMyInfo = async () => {
    try {
      const url = `users/${customerId}`;
      const headers = {
        headers: {
          Authorization: `Bearer ${customerToken}`,
        },
      };

      const response = await axios.get(url, headers);
      console.log('customerId', customerId);
      console.log('response.data', response.data);

      setUserId(response.data.userId);
      setName(response.data.userName);
      setAddress(response.data.address);
      setPhoneNumber(response.data.phoneNumber);
      setCardNumber(response.data.cardNumber);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyInfo();
  }, []);

  const onSubmit = async (data) => {
    try {
      await new Promise((r) => setTimeout(r, 1000));

      console.log('submit data', data);
      const options = {
        headers: {
          Authorization: `Bearer ${customerToken}`,
        },
      };

      const url = `users/${customerId}`;
      const response = await axios.patch(url, data, options);
      console.log('response.data', response.data);
      alert('회원정보 수정이 완료되었습니다.');
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

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
                disabled={true}
                id='userId'
                type='text'
                name='userId'
                placeholder={userId}
                defaultValue={userId}
                aria-invalid={
                  !isDirty ? undefined : errors.userId ? 'true' : 'false'
                }
              />
              <label className='title' htmlFor='userName'>
                이름
              </label>
              <input
                id='userName'
                type='text'
                name='userName'
                placeholder={name}
                defaultValue={name}
                aria-invalid={
                  !isDirty ? undefined : errors.userName ? 'true' : 'false'
                }
                {...register('userName')}
              />
              {/* {errors.name && (
                <small role='alert' className='input-alert'>
                  {errors.name.message}
                </small>
              )} */}
              <label className='title' htmlFor='phoneNumber'>
                전화번호
              </label>
              <input
                id='phoneNumber'
                type='text'
                name='phoneNumber'
                placeholder={phoneNumber}
                defaultValue={phoneNumber}
                aria-invalid={
                  !isDirty ? undefined : errors.phoneNumber ? 'true' : 'false'
                }
                {...register('phoneNumber')}
              />
              {/* {errors.phoneNumber && (
                <small role='alert' className='input-alert'>
                  {errors.phoneNumber.message}
                </small>
              )} */}
              <label className='title' htmlFor='address'>
                주소
              </label>
              <input
                id='address'
                type='text'
                name='address'
                placeholder={address}
                defaultValue={address}
                aria-invalid={
                  !isDirty ? undefined : errors.address ? 'true' : 'false'
                }
                {...register('address')}
              />
              {/* {errors.address && (
                <small role='alert' className='input-alert'>
                  {errors.address.message}
                </small>
              )} */}
              <label className='title' htmlFor='cardNumber'>
                카드번호
              </label>
              <input
                id='cardNumber'
                type='text'
                name='cardNumber'
                placeholder={cardNumber}
                defaultValue={cardNumber}
                aria-invalid={
                  !isDirty ? undefined : errors.cardNumber ? 'true' : 'false'
                }
                {...register('cardNumber')}
              />
              {/* {errors.cardNumber && (
                <small role='alert' className='input-alert'>
                  {errors.cardNumber.message}
                </small>
              )} */}
            </div>
            <div className='bottom-container'>
              <button
                className='edit-button'
                type='submit'
                disabled={isSubmitting}
              >
                <span>수정</span>
              </button>
              <NavLink to='/exit' className='exit-button'>
                <span>회원탈퇴</span>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </CustomerLayout>
  );
}

export default MyPage;
