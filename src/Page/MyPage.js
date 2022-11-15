import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import CustomerLayout from '../Component/CustomerLayout';
import Header from '../Component/Header';

import '../scss/MyPage.scss';

function MyPage() {
  const {
    register,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();

  return (
    <CustomerLayout>
      <Header />
      <div className='center-container'>
        <div className='order-complete-container'>
          <div className='top-title'>
            <span className='title-text'>마이페이지</span>
          </div>
          <div className='order-info-container'>
            <div className='info-title'>아이디</div>
            <div className='info-content'>sogong1234</div>
            <div className='info-title'>비밀번호</div>
            <div className='info-content'>*****</div>
            <div className='info-title'>이름</div>
            <input
              id='customername'
              type='text'
              name='customername'
              placeholder='이름'
              aria-invalid={
                !isDirty ? undefined : errors.customerId ? 'true' : 'false'
              }
              {...register('customerId', {
                required: '이름을 입력해주세요.',
              })}
            />
          </div>
          <div className='goto-main-button-container'>
            <button type='submit' disabled={isSubmitting}>
              수정
            </button>
            <Link to='/'>
              <div className='goto-main-button'>회원탈퇴</div>
            </Link>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}

export default MyPage;
