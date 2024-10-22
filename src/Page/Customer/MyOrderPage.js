import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { format, parseISO } from 'date-fns';
import axios from 'axios';
import CustomerLayout from '../../Component/CustomerLayout';
import Header from '../../Component/Header';
import '../../scss/MyOrderPage.scss';

const STEAK_DEGREE = ['레어', '미디움레어', '미디움', '미디움웰', '웰던'];
const DINNER_NAME = ['발렌타인', '프렌치', '잉글리시', '샴페인 축제'];
const ORDER_STATE = new Map([
  [8, '결제완료'],
  [16, '예약'],
  [33, '조리중'],
  [34, '배달중'],
  [255, '완료'],
]);

function DevlieryInfo(props) {
  const navigate = useNavigate();

  const customerId = localStorage.getItem('customerId');
  const customerToken = localStorage.getItem('customerToken');

  const orderId = props.orderId;
  const myOrder = props.myOrder;
  const rsvDate = format(parseISO(myOrder.rsvDate), 'yyyy.MM.dd (HH:mm)');

  const handlePutCartButtonClick = async () => {
    try {
      console.log('handlePutCartButtonClick orderId', orderId);
      const url = `orders/${orderId}/copy`;
      const data = { userId: `${customerId}` };
      const options = {
        headers: {
          Authorization: `Bearer ${customerToken}`,
        },
      };
      const response = await axios.post(url, data, options);
      alert('해당 주문이 장바구니에 추가되었습니다.');
      console.log('response.statusText', response.statusText);
      navigate('/cart');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='right-container'>
      <div className='right-box'>
        <div className='delivery-info-container'>
          <div className='title'>배달정보</div>
          <div className='content-container'>
            <div className='rsv-date-title content-title'>예약일시</div>
            <div className='rsv-date second-col'>{rsvDate}</div>
            <div className='address-title content-title'>배송지</div>
            <div className='address-input-container second-col'>
              {myOrder.deliveryAddress}
            </div>
            <div className='card-number-title content-title'>카드번호</div>
            <div className='card-number second-col'>{myOrder.cardNumber}</div>
            {myOrder.request == '' || myOrder.request == null ? (
              <></>
            ) : (
              <>
                <div className='request-title content-title'>요청사항</div>
                <div className='request-input-container second-col'>
                  {myOrder.request}
                </div>
              </>
            )}
          </div>
        </div>
        <div className='payment-info-container'>
          <div className='title'>결제금액</div>
          <div className='content-container'>
            <div className='total-price-title content-title'>주문금액</div>
            <div className='total-price-number'>{myOrder.totalPrice}원</div>
            {myOrder.totalPrice != myOrder.paymentPrice ? (
              <>
                <div className='discount-price-title content-title'>
                  단골할인금액
                </div>
                <div className='discount-price-number'>
                  - {myOrder.totalPrice - myOrder.paymentPrice}원
                </div>
              </>
            ) : null}
            <div className='payment-price-title  content-title'>
              총 결제금액
            </div>
            <div className='payment-price-number '>
              {myOrder.paymentPrice}원
            </div>
          </div>
        </div>
        <div className='put-cart-button-container'>
          <div className='put-cart-button' onClick={handlePutCartButtonClick}>
            <span>장바구니에 담기</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function OptionItem(props) {
  const option = props.option;
  const dinnerId = props.dinnerId;
  const dinnerOptionId = option.dinnerOptionId;

  const [dinnerOptionDetail, setDinnerOptionDetail] = useState('');
  const [dinnerOptionPrice, setDinnerOptionPrice] = useState(0);
  const [isPriceMinus, setIsPriceMinus] = useState(false);

  /**
   * 해당 값만큼 option 출력해야 함 (return할 때)
   */
  const optionAmount = option.amount;
  const amountArray = Array(optionAmount).fill(1);

  const getOptionName = async () => {
    try {
      const url = `menu/dinners/${dinnerId}/options`;
      const response = await axios.get(url);

      /**
       * 출력해야 하는 옵션
       */
      const target = response.data.find((option) => {
        return option.dinnerOptionId === dinnerOptionId;
      });

      setDinnerOptionDetail(target.dinnerOptionDetail);
      setDinnerOptionPrice(target.dinnerOptionPrice);

      setIsPriceMinus(
        target.dinnerOptionName === '메인메뉴 삭제' ? true : false,
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOptionName();
  }, []);

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

function ChangeDinnerDetail(props) {
  const navigate = useNavigate();
  const orderDinnerId = props.orderDinnerId;
  const dinner = props.dinner;

  const handleChangeDinnerDetailButton = () => {
    navigate('/edit', {
      state: {
        orderDinnerId: orderDinnerId,
        dinner: dinner,
      },
    });
  };

  return (
    <div
      className='change-dinner-detail-button'
      onClick={handleChangeDinnerDetailButton}
    >
      <span>수정</span>
    </div>
  );
}

function DinnerItem(props) {
  const dinner = props.dinner;
  const dinnerAmount = dinner.dinnerAmount;
  const totalDinnerPrice = dinner.totalDinnerPrice;
  const styleId = dinner.styleId;
  const dinnerOptions = props.dinnerOptions;
  const dinnerId = dinner.dinnerId;
  const degreeId = dinner.degreeId;
  const orderDinnerId = dinner.orderDinnerId;
  // console.log('dinner', dinner);

  const [styleInfo, setStyleInfo] = useState({});

  const getStyleInfo = async () => {
    /**선택한 스타일 한글명과 가격 조회 */
    try {
      const url = `menu/styles/${styleId}`;
      const response = await axios.get(url);
      setStyleInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStyleInfo();
  }, []);

  return (
    <div className='myorder-dinner'>
      <ChangeDinnerDetail orderDinnerId={orderDinnerId} dinner={dinner} />
      <div className='dinner-and-style-container'>
        <div className='dinner-title'>
          <div className='dinner-name'>{DINNER_NAME[dinnerId - 1]} 디너</div>
          <div className='steak-degree-container'>
            <div className='steak-degree-title'>
              {STEAK_DEGREE[degreeId - 1]}
            </div>
          </div>
        </div>
        <div className='style-name'>
          {styleInfo.styleName} 스타일 (+{styleInfo.stylePrice}원)
        </div>
        {dinnerOptions.map((option) => {
          return (
            <OptionItem
              key={option.dinnerOptionId}
              option={option}
              dinnerId={dinnerId}
            />
          );
        })}
      </div>
      <div className='dinner-number'>{dinnerAmount}</div>
      <div className='dinner-price'>{totalDinnerPrice}원</div>
    </div>
  );
}

function MenuInfo(props) {
  const customerToken = localStorage.getItem('customerToken');

  const orderId = props.orderId;
  const totalPrice = props.totalPrice;
  const orderDate = format(parseISO(props.orderDate), 'yyyy년 MM월 dd일');
  const orderState = props.orderState;

  const [dinners, setDinners] = useState([]);
  const orderStateName = ORDER_STATE.get(orderState);

  const getMyDinners = async () => {
    try {
      const url = `orders/${orderId}`;
      const options = {
        headers: {
          Authorization: `Bearer ${customerToken}`,
        },
      };
      const response = await axios.get(url, options);
      setDinners(response.data.orderDinners);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyDinners();
  }, []);

  return (
    <div className='left-container'>
      <div className='left-top-title'>
        <span>{orderDate} 주문</span>
        <span className='dot'>•</span>
        <span className='order-state'>{orderStateName}</span>
      </div>
      {dinners.map((dinner) => {
        return (
          <DinnerItem
            key={dinner.orderDinnerId}
            dinner={dinner}
            dinnerOptions={dinner.orderDinnerOptions}
          />
        );
      })}

      <div className='total-container'>
        <div className='title'>주문금액</div>
        <div className='total-price'>{totalPrice}원</div>
      </div>
    </div>
  );
}

function MyOrderItem(props) {
  const myOrder = props.myOrder;
  const orderId = props.orderId;
  const totalPrice = myOrder.totalPrice;
  const orderDate = myOrder.orderDate;
  const orderState = myOrder.orderState;

  return (
    <div className='single-order-container'>
      <MenuInfo
        orderId={orderId}
        totalPrice={totalPrice}
        orderDate={orderDate}
        orderState={orderState}
      />
      <DevlieryInfo orderId={orderId} myOrder={myOrder} />
    </div>
  );
}

function MyOrderForm() {
  const customerId = localStorage.getItem('customerId');
  const customerToken = localStorage.getItem('customerToken');

  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyOrders = async () => {
    try {
      const url = `orders`;
      let options = {
        params: {
          user_id: `${customerId}`,
          order_by: 'order_date',
          order_direction: 'DESC',
        },
        headers: {
          Authorization: `Bearer ${customerToken}`,
        },
      };

      const response = await axios.get(url, options);
      setMyOrders(response.data.items);
      console.log('[getMyOrders]', response.data);

      /**주문내역이 10개 이상이면 페이지가 넘어가도록 함 */
      const maxPage = response.data.pageMax;
      let tmpOrders = [];
      for (let currentPage = 1; currentPage <= maxPage; currentPage++) {
        options.params.page = currentPage;
        const response = await axios.get(url, options);
        // list = [...list, ...response.data.items];
        const newItems = await response.data.items;
        tmpOrders = [...tmpOrders, ...newItems];
      }

      console.log('tmpOrders', tmpOrders);
      setMyOrders(tmpOrders);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyOrders();
  }, []);

  return (
    <div className='myorder-layout-container'>
      <div className='myorder-component-container'>
        <div className='main-title'>주문내역</div>
        <div className='myorder-list-container'>
          {!loading &&
            (myOrders.length != 0 ? (
              myOrders.map((myOrder) => {
                return (
                  <MyOrderItem
                    key={myOrder.orderId}
                    myOrder={myOrder}
                    orderId={myOrder.orderId}
                  />
                );
              })
            ) : (
              <div className='no-my-order'>주문내역이 없습니다.</div>
            ))}
        </div>
      </div>
    </div>
  );
}

function MyOrderPage() {
  return (
    <CustomerLayout>
      <Header />
      <MyOrderForm />
    </CustomerLayout>
  );
}

export default MyOrderPage;
