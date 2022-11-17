import axios from 'axios';
import { React, useState, CheckBox } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, Route } from 'react-router-dom';
import '../scss/CustomerSignupPage.scss';

function CustomerSignupForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();

  const [check] = useState(false);

  const onSubmit = async (data) => {
    try {
      await new Promise((r) => setTimeout(r, 1000));

      console.log(data);

      const url =
        'https://stoplight.io/mocks/hoqn/cowball-mrdaebak/106750649/users';

      const response = await axios.post(url, data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCheckCustomerIdMessage = (customerId) => {
    axios.post(
      `https://stoplight.io/mocks/hoqn/cowball-mrdaebak/106750649/users`,
      {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
        },
        params: {
          customerId: customerId ?? '',
        },
      },
    );
    return axios;
  };

  const Signup = (customerId) => {
    axios
      .post({
        url: `https://stoplight.io/mocks/hoqn/cowball-mrdaebak/106750649/users`,
        method: 'post',
        headers: {
          'Content-type': 'application/json',
        },
        data: {
          customerId: customerId ?? '',
        },
      })
      .then((res) => {
        window.localStorage.setItem(
          'signupResponseData',
          JSON.stringify(res.data),
        );
        //Router.push('/ordercomplete');
        <Route to={'/ordercomplete'} />;
      });
    return axios;
  };

  const onCustomerIdCheck = (e) => {
    //const value = e.currentTarget.value ?? '';
    //setPassword(value);
    getCheckCustomerIdMessage(e.customerId);
  };

  //const
  return (
    <div className='customer-signup-form-container'>
      <form className='customer-signup-form' onSubmit={handleSubmit(onSubmit)}>
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
        <label htmlFor='customerId'>아이디</label>
        <input
          id='customerId'
          type='text'
          name='customerId'
          placeholder='아이디'
          aria-invalid={
            !isDirty ? undefined : errors.customerId ? 'true' : 'false'
          }
          {...register('customerId', {
            required: '아이디를 입력해주세요.',
          })}
        />
        {errors.customerId && (
          <small role='alert' className='input-alert'>
            {errors.customerId.message}
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
        <div className='confirm-container'>
          <div className='confirm-text'>
            개인 정보 수집 및 이용에 동의합니다
          </div>
          <CheckBox type='checkbox' name='check' onChange={check} />
        </div>
        <div className='signup-button-container'>
          <button
            className='signup-button'
            type='submit'
            disabled={isSubmitting}
            onChange={(e) => onCustomerIdCheck(e)}
            onClick={() => Signup()}
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
