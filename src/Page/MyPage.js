import axios from 'axios';
import { React } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import CustomerLayout from '../Component/CustomerLayout';
import Header from '../Component/Header';

import '../scss/MyPage.scss';

function MyPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({
    defaultValues: {
      name: 'hi',
    },
  });

  const onSubmit = async (data) => {
    try {
      await new Promise((r) => setTimeout(r, 1000));

      const url =
        'https://stoplight.io/mocks/hoqn/cowball-mrdaebak/106750649/auth/customer';

      const response = await axios.post(url, data);
      console.log(response.data.result); //access-token
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CustomerLayout>
      <Header />
      <div className='center-container'>
        <div className='mypage-container'>
          <div className='top-title'>
            <span className='title-text'>마이페이지</span>
          </div>
          <form className='mypage-info-form' onSubmit={handleSubmit(onSubmit)}>
            <div className='info-title'>아이디</div>
            <div className='info-content'>sogong1234</div>
            <div className='info-title'>비밀번호</div>
            <div className='info-content'>*****</div>
            <div className='info-title'>이름</div>
            <input
              id='name'
              type='text'
              name='name'
              defaultValue='이소공'
              aria-invalid={
                !isDirty ? undefined : errors.name ? 'true' : 'false'
              }
              {...register('customerId', {
                required: '이름을 입력해주세요.',
              })}
            />
            <div className='info-title'>전화번호</div>
            <input
              id='phoneNumber'
              type='number'
              name='phoneNumber'
              defaultValue='01012345678'
              aria-invalid={
                !isDirty ? undefined : errors.phoneNumber ? 'true' : 'false'
              }
              {...register('phoneNumber', {
                required: '전화번호를 입력해주세요.',
              })}
            />
            <div className='info-title'>주소</div>
            <input
              id='address'
              type='text'
              name='address'
              defaultValue='휘경동'
              aria-invalid={
                !isDirty ? undefined : errors.address ? 'true' : 'false'
              }
              {...register('customerId', {
                required: '주소를 입력해주세요.',
              })}
            />
            <div className='info-title'>카드번호</div>
            <input
              id='cardNumber'
              type='number'
              name='cardNumber'
              defaultValue='123412341234'
              aria-invalid={
                !isDirty ? undefined : errors.cardNumber ? 'true' : 'false'
              }
              {...register('cardNumber', {
                required: '카드번호를 입력해주세요.',
              })}
            />
          </form>
          <div className='customer-modify-button'>
            <button type='submit' disabled={isSubmitting}>
              수정
            </button>
          </div>
          <div className='buttom-nav-container'>
            <NavLink to='/exit'>회원 탈퇴</NavLink>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}

export default MyPage;
