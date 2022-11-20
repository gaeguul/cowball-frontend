import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useForm } from 'react-hook-form';
import CustomerLayout from '../Component/CustomerLayout';
import Header from '../Component/Header';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { RiCloseCircleFill } from 'react-icons/ri';

import DatePicker from 'react-datepicker';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import 'react-datepicker/dist/react-datepicker.css';
// import { AuthContext } from '../Context/AuthContext';

import '../scss/CartPage.scss';

// const value = useContext(AuthContext);
// const customerToken = value.customerToken;
// const customerId = value.customerId;

const STEAK_DEGREE = ['레어', '미디움레어', '미디움', '미디움웰', '웰던'];
const DINNER_NAME = ['발렌타인', '프렌치', '잉글리시', '샴페인 축제'];

const customerId = localStorage.getItem('customerId');
const customerToken = localStorage.getItem('customerToken');

function DeleteDinnerButton(props) {
  const orderDinnerId = props.orderDinnerId;

  const deleteDinnerButtonClick = async () => {
    await new Promise((r) => setTimeout(r, 1000));

    console.log('deleteDinnerButtonClick');

    try {
      const options = {
        headers: {
          Authorization: `Bearer ${customerToken}`,
        },
      };
      const url = `cart/${customerId}/${orderDinnerId}`;
      const response = await axios.delete(url, options);

      console.log('[DeleteDinnerButton] response.data', response.data);
      alert('해당 디너가 삭제되었습니다.');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='delete-dinner-button'>
      <RiCloseCircleFill className='button' onClick={deleteDinnerButtonClick} />
    </div>
  );
}

function ChangeDinnerNumberButton(props) {
  // const [dinnerNumber, setDinnerNumber] = useState(0);
  const dinnerNumber = props.dinnerNumber;
  const [newDinnerNumber, setNewDinnerNumber] = useState(dinnerNumber);

  const decreaseDinnerNumber = () => {
    if (newDinnerNumber == 0) {
      console.log('더 이상 줄일 수 없습니다');
    } else {
      setNewDinnerNumber((prev) => prev + 1);
    }
  };

  const increaseDinnerNumber = () => {
    setNewDinnerNumber((prev) => prev + 1);
  };

  // useEffect(() => {

  // })

  return (
    <div className='dinner-number-button-container'>
      <div className='dinner-number-button'>
        <div className='button-container'>
          <BiMinus className='button' onClick={decreaseDinnerNumber} />
        </div>
        <div className='number'>{newDinnerNumber}</div>
        <div className='button-container'>
          <BiPlus className='button' onClick={increaseDinnerNumber} />
        </div>
      </div>
    </div>
  );
}

/**배달 예약일시 선택하는 컴포넌트 */
function DatePickerComponent(props) {
  const [date, setDate] = useState(setHours(setMinutes(new Date(), 30), 16));

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
    setHours(setMinutes(new Date(), 0), 21),
    setHours(setMinutes(new Date(), 30), 21),
    setHours(setMinutes(new Date(), 0), 22),
  ];

  useEffect(() => {
    props.setRsvDate(date);
  }, [date]);

  return (
    <DatePicker
      selected={date}
      onChange={(date) => setDate(date)}
      dateFormat='yyyy.MM.dd (h:mm aa)'
      showTimeSelect
      includeTimes={includeTimes}
    />
  );
}

function OptionItem(props) {
  const dinnerId = props.dinnerId;
  const option = props.option;
  const optionId = option.dinnerOptionId;

  const [dinnerOptionDetail, setDinnerOptionDetail] = useState('');
  const [dinnerOptionPrice, setDinnerOptionPrice] = useState(0);

  const [isPriceMinus, setIsPriceMinus] = useState(false);
  const optionAmount = option.amount;
  const amountArray = Array(optionAmount).fill(1);

  const getOptionName = useCallback(async () => {
    try {
      const url = `menu/dinners/${dinnerId}/options`;
      const response = await axios.get(url);

      /**
       * 출력해야 하는 옵션
       */
      const target = response.data.find((option) => {
        return option.dinnerOptionId === optionId;
      });

      setDinnerOptionDetail(target.dinnerOptionDetail);
      setDinnerOptionPrice(target.dinnerOptionPrice);

      setIsPriceMinus(
        target.dinnerOptionName === '메인메뉴 삭제' ? true : false,
      );
    } catch (error) {
      console.log(error);
    }
  }, [optionId]);

  useEffect(() => {
    getOptionName();
  }, [getOptionName]);

  return (
    <>
      {amountArray.map((i, index) => {
        return (
          <div key={index} className='dinner-option'>
            {isPriceMinus ? <>-</> : <>+</>} {dinnerOptionDetail} (
            {isPriceMinus ? null : <>+</>}
            {dinnerOptionPrice}
            원)
          </div>
        );
      })}
    </>
  );
}

function DinnerItem(props) {
  const dinner = props.dinner;
  const options = dinner.orderDinnerOptions;
  const orderDinnerId = dinner.orderDinnerId;

  const [styleInfo, setStyleInfo] = useState({});

  const getStyleInfo = useCallback(async () => {
    /**선택한 스타일 한글명과 가격 조회 */
    try {
      const url = `menu/styles/${dinner.styleId}`;
      const response = await axios.get(url);
      setStyleInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [dinner]);

  useEffect(() => {
    getStyleInfo();
  }, [getStyleInfo]);

  return (
    <div className='cart-dinner'>
      <DeleteDinnerButton orderDinnerId={orderDinnerId} />
      <div className='dinner-and-style-container'>
        <div className='dinner-title'>
          <div className='dinner-name'>
            {DINNER_NAME[dinner.dinnerId - 1]} 디너
          </div>
          <div className='steak-degree-container'>
            <div className='steak-degree-title'>
              {STEAK_DEGREE[dinner.degreeId - 1]}
            </div>
          </div>
        </div>
        <div className='style-name'>
          {styleInfo.styleName} 스타일 (+{styleInfo.stylePrice}원)
        </div>
        {options.map((option) => {
          return (
            <OptionItem
              key={option.dinnerOptionId}
              dinnerId={dinner.dinnerId}
              option={option}
            />
          );
        })}
      </div>
      <div className='dinner-number'>
        <ChangeDinnerNumberButton dinnerNumber={dinner.dinnerAmount} />
      </div>
      <div className='dinner-price'>{dinner.totalDinnerPrice}원</div>
    </div>
  );
}

function CartPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const makeNewOrder = async () => {
    try {
      const url = `orders`;
      const options = {
        headers: {
          Authorization: `Bearer ${customerToken}`,
        },
        data: { userId: `${customerId}` },
      };

      console.log(options);
      const response = await axios.post(url, options);
      console.log('[makeNewOrder]', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const changeDeliveryInfo = async (newDeliveryData) => {
    try {
      console.log('newDeliveryData', newDeliveryData);
      const url = `cart/${customerId}`;
      const options = {
        headers: {
          Authorization: `Bearer ${customerToken}`,
        },
      };
      const response = await axios.patch(url, newDeliveryData, options);
      console.log('[changeDeliveryInfo]', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    // console.log(JSON.stringify(data));
    const newDeliveryData = {
      rsvDate: rsvDate,
      deliveryAddress: data['delivery-address'],
      request: data['request'],
      cardNumber: data['card-number'],
      phoneNumber: '01012345678',
    };

    /**1. 장바구니 정보 수정 */
    await changeDeliveryInfo(newDeliveryData);

    /**2. 주문하기 */
    await makeNewOrder(); //에러남!!!
    navigate('/ordercomplete');
  };

  const [rsvDate, setRsvDate] = useState('');
  const [cartInfo, setCartInfo] = useState({});
  const [dinners, setDinners] = useState([]);
  const [grade, setGrade] = useState(0);

  const getCartInfo = useCallback(async () => {
    try {
      const url = `cart/${customerId}`;
      const headers = {
        headers: {
          Authorization: `Bearer ${customerToken}`,
        },
      };
      const response = await axios.get(url, headers);
      console.log('response.data', response.data);
      console.log('response.data.orderDinners', response.data?.orderDinners);
      setCartInfo(response.data);
      setDinners(response.data.orderDinners);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [customerToken, customerId]);

  useEffect(() => {
    getCartInfo();
  }, [getCartInfo]);

  useEffect(() => {
    const getUserGrade = async () => {
      try {
        const options = {
          headers: {
            Authorization: `Bearer ${customerToken}`,
          },
        };

        const url = `users/${customerId}`;
        const response = await axios.get(url, options);
        setGrade(response.data.grade);
      } catch (error) {
        console.log(error);
      }
    };
    getUserGrade();
  }, []);

  return (
    <CustomerLayout>
      <Header />
      <div className='main-container'>
        <div className='cart-container'>
          <div className='main-title'>장바구니</div>
          <div className='dinner-cart-list-container'>
            <div className='menu-container'>
              {dinners.map((dinner) => {
                return (
                  <DinnerItem key={dinner.orderDinnerId} dinner={dinner} />
                );
              })}
              <div className='total-container'>
                <div className='title'>주문금액</div>
                <div className='total-price'>{cartInfo.totalPrice}원</div>
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
                      <DatePickerComponent setRsvDate={setRsvDate} />
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
                    <div className='request-input-container'>
                      <input
                        id='card-number'
                        type='text'
                        name='card-number'
                        {...register('card-number')}
                      />
                    </div>
                  </div>
                </div>
                <div className='payment-info-container'>
                  <div className='title'>결제금액</div>
                  <div className='content-container'>
                    <div className='total-price-title content-title'>
                      주문금액
                    </div>
                    <div className='total-price-number'>
                      {cartInfo.totalPrice}원
                    </div>
                    {grade === 0 ? null : (
                      <>
                        <div className='discount-price-title content-title'>
                          단골할인금액
                        </div>
                        <div className='discount-price-number'>- 5,000원</div>
                      </>
                    )}

                    <div className='payment-price-title  content-title'>
                      총 결제금액
                    </div>
                    <div className='payment-price-number '>
                      {cartInfo.paymentPrice}원
                    </div>
                  </div>
                </div>
              </div>
              <button
                type='submit'
                className='pay-button'
                disabled={isSubmitting}
              >
                <span className='payment-price-number'>
                  {cartInfo.paymentPrice}
                </span>
                원 결제하기
              </button>
            </form>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}

export default CartPage;
