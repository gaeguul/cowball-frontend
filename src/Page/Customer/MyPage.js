import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomerLayout from '../../Component/CustomerLayout';
import Header from '../../Component/Header';
import '../../scss/MyPage.scss';
import { NavLink } from 'react-router-dom';

function MyPageForm() {
  const customerId = localStorage.getItem('customerId');
  const customerToken = localStorage.getItem('customerToken');

  const [userId, setUserId] = useState(null);
  const [address, setAddress] = useState(null);
  const [cardNumber, setCardNumber] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [name, setName] = useState(null);

  let data = {
    address: address,
    cardNumber: cardNumber,
    phoneNumber: phoneNumber,
    userName: name,
  };

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

  const submitInfo = async () => {
    try {
      if (
        name == '' ||
        address == '' ||
        phoneNumber == '' ||
        cardNumber == ''
      ) {
        alert('회원 정보를 모두 입력해주세요.');
      } else if (!Number(phoneNumber) || !Number(cardNumber)) {
        alert('카드번호와 전화번호를 숫자로 입력해주세요.');
      } else {
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
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='mypage-center-container'>
      <div className='mypage-container'>
        <div className='top-title'>
          <span className='title-text'>마이페이지</span>
        </div>
        <div className='form-container'>
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
              onChange={(event) => setName(event.target.value)}
            />
            <label className='title' htmlFor='phoneNumber'>
              전화번호
            </label>
            <input
              id='phoneNumber'
              type='text'
              name='phoneNumber'
              placeholder={phoneNumber}
              defaultValue={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
            <label className='title' htmlFor='address'>
              주소
            </label>
            <input
              id='address'
              type='text'
              name='address'
              placeholder={address}
              defaultValue={address}
              onChange={(event) => setAddress(event.target.value)}
            />
            <label className='title' htmlFor='cardNumber'>
              카드번호
            </label>
            <input
              id='cardNumber'
              type='text'
              name='cardNumber'
              placeholder={cardNumber}
              defaultValue={cardNumber}
              onChange={(event) => setCardNumber(event.target.value)}
            />
          </div>
          <div className='bottom-container'>
            <button className='edit-button' onClick={submitInfo}>
              <span>수정</span>
            </button>
            <NavLink to='/exit' className='exit-button'>
              <span>회원탈퇴</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

function MyPage() {
  return (
    <CustomerLayout>
      <Header />
      <MyPageForm />
    </CustomerLayout>
  );
}

export default MyPage;
