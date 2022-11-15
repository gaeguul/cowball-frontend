import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomerLayout from '../Component/CustomerLayout';
import Header from '../Component/Header';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { RiCloseCircleFill } from 'react-icons/ri';

import DatePicker from 'react-datepicker';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import 'react-datepicker/dist/react-datepicker.css';

import '../scss/CartPage.scss';

function DeleteDinnerButton() {
  const deleteDinnerButtonClick = () => {
    console.log('deleteDinnerButtonClick');
  };
  return (
    <div className='delete-dinner-button'>
      <RiCloseCircleFill className='button' onClick={deleteDinnerButtonClick} />
    </div>
  );
}

function ChangeDinnerNumberButton() {
  const [dinnerNumber, setDinnerNumber] = useState(0);

  const decreaseDinnerNumber = () => {
    if (dinnerNumber == 0) {
      console.log('더 이상 줄일 수 없습니다');
    } else {
      setDinnerNumber(dinnerNumber - 1);
    }
  };

  const increaseDinnerNumber = () => {
    setDinnerNumber(dinnerNumber + 1);
  };

  return (
    <div className='dinner-number-button-container'>
      <div className='dinner-number-button'>
        <div className='button-container'>
          <BiMinus className='button' onClick={decreaseDinnerNumber} />
        </div>
        <div className='number'>{dinnerNumber}</div>
        <div className='button-container'>
          <BiPlus className='button' onClick={increaseDinnerNumber} />
        </div>
      </div>
    </div>
  );
}

function DatePickerComponent() {
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16),
  );

  const includeTimes = [
    setHours(setMinutes(new Date(), 30), 15),
    setHours(setMinutes(new Date(), 0), 16),
    setHours(setMinutes(new Date(), 30), 16),
    setHours(setMinutes(new Date(), 0), 17),
    setHours(setMinutes(new Date(), 30), 17),
    setHours(setMinutes(new Date(), 0), 18),
    setHours(setMinutes(new Date(), 30), 18),
    setHours(setMinutes(new Date(), 0), 19),
    setHours(setMinutes(new Date(), 30), 19),
    setHours(setMinutes(new Date(), 0), 20),
    setHours(setMinutes(new Date(), 30), 20),
  ];

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat='yyyy.MM.dd h:mm aa'
      showTimeSelect
      includeTimes={includeTimes}
    />
  );
}

function CartPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    console.log(JSON.stringify(data));
  };

  return (
    <CustomerLayout>
      <Header />
      <div className='main-container'>
        <div className='cart-container'>
          <div className='main-title'>장바구니</div>
          <div className='dinner-cart-list-container'>
            <div className='menu-container'>
              <div className='cart-dinner'>
                <DeleteDinnerButton />
                <div className='dinner-and-style-container'>
                  <div className='dinner-title'>
                    <div className='dinner-name'>프렌치 디너</div>
                    <div className='steak-degree-container'>
                      <div className='steak-degree-title'>레어</div>
                    </div>
                  </div>
                  <div className='dinner-option'>
                    - 에그스크램블 삭제 (-5,000원)
                  </div>
                  <div className='dinner-option'>
                    + 레어 스테이크 1인분 추가 (20,000원)
                  </div>
                  <div className='dinner-option'>
                    + 베이컨 1장 추가 (2,000원)
                  </div>
                  <div className='style-name'>심플 스타일 (10,000원)</div>
                  <div className='style-option'>+ 접시 추가 (3,000원)</div>
                </div>
                <div className='dinner-number'>
                  <ChangeDinnerNumberButton />
                </div>
                <div className='dinner-price'>40,000원</div>
              </div>
              <div className='cart-dinner'>
                <DeleteDinnerButton />
                <div className='dinner-and-style-container'>
                  <div className='dinner-title'>
                    <div className='dinner-name'>프렌치 디너</div>
                    <div className='steak-degree-container'>
                      <div className='steak-degree-title'>미디움</div>
                    </div>
                  </div>
                  <div className='style-name'>그랜드 스타일 (15,000원)</div>
                </div>
                <div className='dinner-number'>
                  <ChangeDinnerNumberButton />
                </div>
                <div className='dinner-price'>33,000원</div>
              </div>
              <div className='total-container'>
                <div className='title'>주문금액</div>
                <div className='total-price'>73,000원</div>
              </div>
            </div>
            <form
              className='right-info-container'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className='top-info-container'>
                <div className='delivery-info-container'>
                  <div className='title'>배달정보</div>
                  <div className='content-container'>
                    <div className='rsv-date-title content-title'>예약일시</div>
                    <div className='rsv-date date-picker'>
                      <DatePickerComponent />
                    </div>
                    <div className='address-title content-title'>배송지</div>
                    <div className='address-input-container'>
                      <input
                        id='delivery-address'
                        type='text'
                        name='delivery-address'
                        {...register('delivery-address')}
                      />
                    </div>
                    <div className='request-title content-title'>요청사항</div>
                    <div className='request-input-container'>
                      <input
                        id='request'
                        type='text'
                        name='request'
                        {...register('request')}
                      />
                    </div>
                    <div className='card-number-title content-title'>
                      카드번호
                    </div>
                    <div className='card-number'>1235-1235-1235-1235</div>
                  </div>
                </div>
                <div className='payment-info-container'>
                  <div className='title'>결제금액</div>
                  <div className='content-container'>
                    <div className='total-price-title content-title'>
                      주문금액
                    </div>
                    <div className='total-price-number'>80,000원</div>
                    <div className='discount-price-title content-title'>
                      단골할인금액
                    </div>
                    <div className='discount-price-number'>- 5,000원</div>
                    <div className='payment-price-title  content-title'>
                      총 결제금액
                    </div>
                    <div className='payment-price-number '>75,000원</div>
                  </div>
                </div>
              </div>
              <button
                type='submit'
                className='pay-button'
                disabled={isSubmitting}
              >
                <span className='payment-price-number'>75,000</span>원 결제하기
              </button>
            </form>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}

export default CartPage;
