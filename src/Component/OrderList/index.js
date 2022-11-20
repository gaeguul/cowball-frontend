import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const STEAK_DEGREE = ['레어', '미디움레어', '미디움', '미디움웰', '웰던'];
const STATE_NAME = {
  hold: '대기',
  waiting: '예약',
  cooking: '조리중',
  'in-delivery': '배달중',
  done: '완료',
};
const STATE_BUTTON_NAME = new Map([
  [16, '조리시작'],
  [33, '배달시작'],
  [34, '배달완료'],
]);
const STATE_NEXT = new Map([
  [16, 'WAITING'],
  [33, 'IN_DELIVERY'],
  [34, 'COOKING'],
]);

function OrderInfo(props) {
  return (
    <div className='order-info'>
      <div className='title'>주문정보</div>
      <div className='content'>
        <div className='address subtitle'>배송지</div>
        <div className='address detail'>{props.deliveryAddress}</div>
        <div className='phone-number subtitle'>연락처</div>
        <div className='phone-number detail'>{props.phoneNumber}</div>
        <div className='order-date subtitle'>주문일</div>
        <div className='order-date detail'>{props.orderDate}</div>
      </div>
    </div>
  );
}

function DinnerOptionItem(props) {
  const dinnerId = props.dinnerId;
  const orderDinnerOption = props.orderDinnerOption;
  const orderDinnerOptionId = orderDinnerOption.dinnerOptionId;

  const [dinnerOptionDetail, setDinnerOptionDetail] = useState('');
  const [dinnerOptionPrice, setDinnerOptionPrice] = useState(0);

  const [isPriceMinus, setIsPriceMinus] = useState(false);

  /**
   * 해당 값만큼 option 출력해야 함 (return할 때)
   */
  const optionAmount = orderDinnerOption.amount;
  const amountArray = Array(optionAmount).fill(1);

  const getOptionName = async () => {
    try {
      const url = `menu/dinners/${dinnerId}/options`;
      const response = await axios.get(url);

      /**
       * 출력해야 하는 옵션
       */
      const target = response.data.find((option) => {
        return option.dinnerOptionId === orderDinnerOptionId;
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
            {dinnerOptionPrice}
            원)
          </div>
        );
      })}
    </>
  );
}

function OrderDinnerItem(props) {
  const orderDinner = props.orderDinner; //하나의 배달 안에서 시킨 각 디너
  const orderDinnerOptions = orderDinner.orderDinnerOptions; //선택한 디너 옵션
  const [styleInfo, setStyleInfo] = useState({});

  const getStyleInfo = async () => {
    /**선택한 스타일 한글명과 가격 조회 */
    try {
      const url = `menu/styles/${orderDinner.styleId}`;
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
    <div className='dinner'>
      <div className='dinner-and-style-container'>
        <div className='dinner-title'>
          <div className='dinner-name'>프렌치 디너</div>
          <div className='steak-degree-container'>
            <div className='steak-degree-title'>
              {STEAK_DEGREE[orderDinner.degreeId - 1]}
            </div>
          </div>
        </div>
        <div className='style-name'>
          {styleInfo.styleName} 스타일 (+{styleInfo.stylePrice}원)
        </div>
        {orderDinnerOptions.map((orderDinnerOption) => {
          return (
            <DinnerOptionItem
              key={orderDinnerOption.dinnerOptionId}
              dinnerId={orderDinner.dinnerId}
              orderDinnerOption={orderDinnerOption}
            />
          );
        })}
      </div>
      <div className='dinner-number'>1</div>
      <div className='dinner-price'>{orderDinner.totalDinnerPrice}원</div>
    </div>
  );
}

function MenuInfo(props) {
  const orderDinners = props.orderDinners;
  const totalPrice = props.totalPrice;
  const orderDinnerNumber = props.orderDinnerNumber;

  console.log('orderDinners', orderDinners);
  // console.log(orderDinnerNumber);

  return (
    <div className='menu-info'>
      <div className='title'>메뉴정보</div>
      <div className='menu-container'>
        {orderDinners.map((orderDinner) => {
          return (
            <OrderDinnerItem
              key={orderDinner.orderDinnerId}
              orderDinner={orderDinner}
            />
          );
        })}

        <div className='total-container'>
          <div className='total-number'>{orderDinnerNumber}</div>
          <div className='total-price'>{totalPrice}원</div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

function DetailComponent(props) {
  const detailOrderId = props.detailOrderId; //왼쪽 주문목록에서 선택한 디너번호
  const [detailOrderInfo, setDetailOrderInfo] = useState({});
  const [stateButtonName, setStateButtonName] = useState('');
  const [isButtonNotExit, setIsButtonNotExit] = useState(true);
  const [orderStateNumber, setOrderStateNumber] = useState(0);

  const [loading, setLoading] = useState(true);

  const getDetailOrder = async () => {
    try {
      const url = `orders/${detailOrderId}`;
      const response = await axios.get(url);
      setDetailOrderInfo(response.data);
      const orderState = response.data.orderState;
      setOrderStateNumber(orderState);
      // const tmp = orderState === 8 || orderState === 255 ? true : false;
      setIsButtonNotExit(orderState === 8 || orderState === 255 ? true : false);
      setStateButtonName(STATE_BUTTON_NAME.get(orderState));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStateButtonClick = async () => {
    try {
      console.log('orderStateNumber', orderStateNumber);

      const url = `orders/${detailOrderId}/state`;
      const data = {
        orderState: STATE_NEXT.get(orderStateNumber),
      };
      const response = await axios.put(url, data);
      console.log('[handleStateButtonClick] ', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetailOrder();
  }, [detailOrderId]);

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <div className='detail-container'>
          <div className='top'>
            <div className='id-and-button'>
              <span className='order-id'>배달 {detailOrderInfo.orderId}</span>
              {isButtonNotExit ? (
                <></>
              ) : (
                <div className='state-button' onClick={handleStateButtonClick}>
                  <div className='button-title'>{stateButtonName}</div>
                </div>
              )}
            </div>
            <div className='rsv-date'>예약 {detailOrderInfo.rsvDate}</div>
            <div className='number-and-price'>
              <span className='order-number'>
                메뉴 {detailOrderInfo.orderDinners.length}개
              </span>
              <span className='delimiter'>•</span>
              <span className='total-price'>
                {detailOrderInfo.paymentPrice}원
              </span>
            </div>
          </div>
          <div className='bottom'>
            <div className='request'>
              <div className='title'>요청사항</div>
              <div className='content'>{detailOrderInfo.request}</div>
            </div>
            <MenuInfo
              detailOrderId={detailOrderId}
              orderDinners={detailOrderInfo.orderDinners}
              totalPrice={detailOrderInfo.totalPrice}
              orderDinnerNumber={detailOrderInfo.orderDinners.length}
            />
            <OrderInfo
              deliveryAddress={detailOrderInfo.deliveryAddress}
              phoneNumber={detailOrderInfo.phoneNumber}
              orderDate={detailOrderInfo.orderDate}
            />
          </div>
        </div>
      )}
    </>
  );
}

function LeftComponent(props) {
  let { state } = useParams();
  const [orderCount, setOrderCount] = useState('');
  const [orders, setOrders] = useState([]);

  const handleOrderClick = (event, orderId) => {
    props.setDetailOrderId(orderId);
  };

  const getOrders = async () => {
    try {
      const url = `orders`;
      if (state === 'in-delivery') state = 'in_delivery';
      const options = {
        params: {
          state: state,
        },
      };
      const response = await axios.get(url, options);
      setOrderCount(response.data.count);
      setOrders(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, [state]);

  return (
    <div className='left-container'>
      <div className='left-title-container'>
        <div className='left-title'>
          {STATE_NAME[state]}
          <span className='order-count'>{orderCount}</span>건
        </div>
      </div>
      {orders.map((order) => {
        return (
          <div
            className='order'
            key={order.orderId}
            onClick={(event) => handleOrderClick(event, order.orderId)}
          >
            <div className='order-id'>배달 {order.orderId}</div>
            <div className='order-number'>메뉴 {order.orderDinnerCount}개</div>
            <div className='rsv-date'>{order.rsvDate}</div>
          </div>
        );
      })}
    </div>
  );
}

function OrderList() {
  const [detailOrderId, setDetailOrderId] = useState(null);

  return (
    <div className='nexttonav'>
      <div className='orderlist-container'>
        <LeftComponent setDetailOrderId={setDetailOrderId} />
        {!detailOrderId ? (
          <></>
        ) : (
          <DetailComponent detailOrderId={detailOrderId} />
        )}
      </div>
    </div>
  );
}

export default OrderList;
