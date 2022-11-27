import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// import { useForm } from 'react-hook-form';
import CustomerLayout from '../../Component/CustomerLayout';
import Header from '../../Component/Header';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { RiCloseCircleFill } from 'react-icons/ri';

import DatePicker from 'react-datepicker';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
// import format from 'date-fns/format';

import 'react-datepicker/dist/react-datepicker.css';

import '../../scss/CartPage.scss';

const STEAK_DEGREE = ['레어', '미디움레어', '미디움', '미디움웰', '웰던'];
const DINNER_NAME = ['발렌타인', '프렌치', '잉글리시', '샴페인 축제'];

function DeleteDinnerButton({ orderDinnerId }) {
  const customerId = localStorage.getItem('customerId');
  const customerToken = localStorage.getItem('customerToken');

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

      window.location.reload();
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
    console.log('선택된 예약 일시', date);
  }, [date]);

  return (
    <DatePicker
      selected={date}
      onChange={(date) => setDate(date)}
      dateFormat='yyyy.MM.dd (HH:mm)'
      showTimeSelect
      includeTimes={includeTimes}
      minDate={new Date()}
    />
  );
}

function ChangeDinnerNumberButton({
  dinnerNumber,
  orderDinnerId,
  setTotalDinnerPrice,
  getCartInfo,
}) {
  const [newDinnerNumber, setNewDinnerNumber] = useState(dinnerNumber);

  const customerId = localStorage.getItem('customerId');
  const customerToken = localStorage.getItem('customerToken');

  const decreaseDinnerNumber = () => {
    if (newDinnerNumber == 1) {
      console.log('더 이상 줄일 수 없습니다');
    } else {
      setNewDinnerNumber((prev) => prev - 1);
    }
  };

  const increaseDinnerNumber = () => {
    setNewDinnerNumber((prev) => prev + 1);
  };

  /**newDinnerNumber가 변함에 따라 api PATCH */
  useEffect(() => {
    const patchDinnerNumber = async () => {
      try {
        const data = { dinnerAmount: newDinnerNumber };
        const options = {
          headers: {
            Authorization: `Bearer ${customerToken}`,
          },
        };
        const response = await axios.patch(
          `cart/${customerId}/${orderDinnerId}`,
          data,
          options,
        );
        // console.log('디너수량변경 응답', response.data);
        setTotalDinnerPrice(response.data.totalDinnerPrice);
      } catch (error) {
        console.log(error);
      }
    };
    patchDinnerNumber().finally(getCartInfo);
  }, [newDinnerNumber]);

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

      /**출력해야 하는 옵션 */
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
  const getCartInfo = props.getCartInfo;

  const [styleInfo, setStyleInfo] = useState({});
  const [totalDinnerPrice, setTotalDinnerPrice] = useState(
    dinner.totalDinnerPrice,
  );

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

  useEffect(() => {
    console.log('totalDinnerPrice 업데이트 ', totalDinnerPrice);
  }, [totalDinnerPrice]);

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
        <ChangeDinnerNumberButton
          dinnerNumber={dinner.dinnerAmount}
          orderDinnerId={orderDinnerId}
          setTotalDinnerPrice={setTotalDinnerPrice}
          getCartInfo={getCartInfo}
        />
      </div>
      <div className='dinner-price'>{totalDinnerPrice}원</div>
    </div>
  );
}

function CartForm() {
  const customerId = localStorage.getItem('customerId');
  const customerToken = localStorage.getItem('customerToken');

  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [request, setRequest] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [rsvDate, setRsvDate] = useState('');

  const [cartInfo, setCartInfo] = useState({});
  const [dinners, setDinners] = useState([]);

  const getCartInfo = async () => {
    try {
      const url = `cart/${customerId}`;
      const headers = {
        headers: {
          Authorization: `Bearer ${customerToken}`,
        },
      };
      const response = await axios.get(url, headers);
      // console.log('response.data', response.data);
      // console.log('response.data.orderDinners', response.data?.orderDinners);
      setCartInfo(response.data);
      setDinners(response.data.orderDinners);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  /**기존 배달정보 불러오기 */
  const handleLoadMyInfoButtonClick = async () => {
    const customerId = localStorage.getItem('customerId');
    const customerToken = localStorage.getItem('customerToken');

    try {
      const url = `users/${customerId}`;
      const options = {
        headers: {
          Authorization: `Bearer ${customerToken}`,
        },
      };
      const response = await axios.get(url, options);
      console.log('handleLoadMyInfoButtonClick', response.data);

      setAddress(response.data.address);
      setPhoneNumber(response.data.phoneNumber);
      setCardNumber(response.data.cardNumber);
    } catch (error) {
      console.log(error);
    }
  };

  /**결제하기 버튼 눌렀을 때
   * 1. 배달정보 묶어서 전송하고 (PATCH)
   * 2. 결제하기 (POST)
   */
  const makeNewOrder = async (newDeliveryData) => {
    try {
      /**1. 장바구니 배달정보 수정 */

      console.log('newDeliveryData', newDeliveryData);

      const changeInfoResponse = await axios.patch(
        `cart/${customerId}`,
        newDeliveryData,
        {
          headers: {
            Authorization: `Bearer ${customerToken}`,
          },
        },
      );

      console.log('[changeDeliveryInfo]', changeInfoResponse.data);

      // await new Promise((r) => setTimeout(r, 1000));

      /**2. 주문하기 */
      const orderResponse = await axios.post(
        `orders`,
        { userId: `${customerId}` },
        {
          headers: {
            Authorization: `Bearer ${customerToken}`,
          },
        },
      );
      console.log('[makeNewOrder]', orderResponse.data);

      alert('주문이 완료되었습니다.');

      navigate('/ordercomplete', {
        state: {
          orderId: `${orderResponse.data.orderId}`,
          paymentPrice: `${orderResponse.data.paymentPrice}`,
          rsvDate: `${orderResponse.data.rsvDate}`,
        },
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const handlePayButtonClick = async () => {
    try {
      if (dinners.length === 0) {
        alert('디너를 장바구니에 담아주세요.');
      } else if (address == '' || phoneNumber == '' || cardNumber == '') {
        alert('배달정보를 모두 입력해주세요.');
      } else if (!Number(phoneNumber) || !Number(cardNumber)) {
        alert('카드번호와 전화번호를 숫자로 입력해주세요.');
      } else {
        await new Promise((r) => setTimeout(r, 1000));

        const newDeliveryData = {
          rsvDate: rsvDate,
          deliveryAddress: address,
          request: request,
          cardNumber: cardNumber,
          phoneNumber: phoneNumber,
        };

        makeNewOrder(newDeliveryData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartInfo();
  }, []);

  return (
    <div className='main-container'>
      <div className='cart-container'>
        <div className='main-title'>장바구니</div>
        <div className='dinner-cart-list-container'>
          <div className='menu-container'>
            {dinners.length === 0 ? (
              <span className='no-dinner'>
                장바구니에 담긴 디너가 없습니다.
              </span>
            ) : (
              dinners.map((dinner) => {
                return (
                  <DinnerItem
                    key={dinner.orderDinnerId}
                    dinner={dinner}
                    getCartInfo={getCartInfo}
                  />
                );
              })
            )}

            <div className='total-container'>
              <div className='title'>주문금액</div>
              <div className='total-price'>{cartInfo.totalPrice}원</div>
            </div>
          </div>
          <div className='right-info-container'>
            <div className='top-info-container'>
              <div className='delivery-info-container'>
                <div className='title-and-button'>
                  <div className='title'>배달정보</div>
                  <div
                    onClick={handleLoadMyInfoButtonClick}
                    className='load-myinfo-button'
                  >
                    내정보 불러오기
                  </div>
                </div>
                <div className='content-container'>
                  <div className='rsv-date-title content-title'>예약일시</div>
                  <div className='rsv-date date-picker'>
                    <DatePickerComponent setRsvDate={setRsvDate} />
                  </div>
                  <div className='card-number-title content-title'>
                    카드번호
                  </div>
                  <div className='request-input-container'>
                    <input
                      id='card-number'
                      type='text'
                      name='card-number'
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <div className='address-title content-title'>배송지</div>
                  <div className='address-input-container'>
                    <input
                      id='delivery-address'
                      type='text'
                      name='delivery-address'
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className='phone-number-title content-title'>
                    전화번호
                  </div>
                  <div className='request-input-container'>
                    <input
                      id='phone-number'
                      type='text'
                      name='phone-number'
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className='request-title content-title'>요청사항</div>
                  <div className='request-input-container'>
                    <input
                      id='request'
                      type='text'
                      name='request'
                      value={request}
                      onChange={(e) => setRequest(e.target.value)}
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
                  {cartInfo.totalPrice - cartInfo.paymentPrice === 0 ? null : (
                    <>
                      <div className='discount-price-title content-title'>
                        단골할인금액
                      </div>
                      <div className='discount-price-number'>
                        - {cartInfo.totalPrice - cartInfo.paymentPrice}원
                      </div>
                    </>
                  )}
                  <div className='payment-price-title  content-title'>
                    총 결제금액
                  </div>
                  <div className='payment-price-number'>
                    {cartInfo.paymentPrice}원
                  </div>
                </div>
              </div>
            </div>
            <button className='pay-button' onClick={handlePayButtonClick}>
              <span className='payment-price-number'>
                {cartInfo.paymentPrice}
              </span>
              원 결제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartPage() {
  return (
    <CustomerLayout>
      <Header />
      <CartForm />
    </CustomerLayout>
  );
}

export default CartPage;
