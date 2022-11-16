import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// const ORDER_STATE = {
//   waiting: 16,
//   cooking: 33,
//   in_delivery: 34,
//   done: 255,
// };

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

function MenuInfo(props) {
  // const orderId = props.orderId;
  console.log(props.orderId);

  return (
    <div className='menu-info'>
      <div className='title'>메뉴정보</div>
      <div className='menu-container'>
        <div className='dinner'>
          <div className='dinner-and-style-container'>
            <div className='dinner-title'>
              <div className='dinner-name'>프렌치 디너</div>
              <div className='steak-degree-container'>
                <div className='steak-degree-title'>레어</div>
              </div>
            </div>
            <div className='dinner-option'>- 에그스크램블 삭제 (-5,000원)</div>
            <div className='dinner-option'>
              + 레어 스테이크 1인분 추가 (20,000원)
            </div>
            <div className='dinner-option'>+ 베이컨 1장 추가 (2,000원)</div>
            <div className='style-name'>심플 스타일 (10,000원)</div>
            <div className='style-option'>+ 접시 추가 (3,000원)</div>
          </div>
          <div className='dinner-number'>1</div>
          <div className='dinner-price'>40,000원</div>
        </div>
        <div className='dinner'>
          <div className='dinner-and-style-container'>
            <div className='dinner-title'>
              <div className='dinner-name'>프렌치 디너</div>
              <div className='steak-degree-container'>
                <div className='steak-degree-title'>미디움</div>
              </div>
            </div>
            <div className='style-name'>그랜드 스타일 (15,000원)</div>
          </div>
          <div className='dinner-number'>1</div>
          <div className='dinner-price'>33,000원</div>
        </div>
        <div className='total-container'>
          <div className='total-number'>2</div>
          <div className='total-price'>73,000원</div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

function DetailComponent(props) {
  const detailOrderId = props.detailOrderId;
  const [detailOrderInfo, setDetailOrderInfo] = useState({});

  const [loading, setLoading] = useState(true);

  const getDetailOrder = async () => {
    try {
      const url = `orders/${detailOrderId}`;
      const response = await axios.get(url);
      setDetailOrderInfo(response.data);

      setLoading(false);
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
              <div className='state-button'>
                <div className='button-title'>조리시작</div>
              </div>
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
            <MenuInfo orderId={detailOrderId} />
            <div className='menu-info'>
              <div className='title'>메뉴정보</div>
              <div className='menu-container'>
                <div className='dinner'>
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
                  <div className='dinner-number'>1</div>
                  <div className='dinner-price'>40,000원</div>
                </div>
                <div className='dinner'>
                  <div className='dinner-and-style-container'>
                    <div className='dinner-title'>
                      <div className='dinner-name'>프렌치 디너</div>
                      <div className='steak-degree-container'>
                        <div className='steak-degree-title'>미디움</div>
                      </div>
                    </div>
                    <div className='style-name'>그랜드 스타일 (15,000원)</div>
                  </div>
                  <div className='dinner-number'>1</div>
                  <div className='dinner-price'>33,000원</div>
                </div>
                <div className='total-container'>
                  <div className='total-number'>2</div>
                  <div className='total-price'>73,000원</div>
                </div>
              </div>
              <div></div>
            </div>
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
  const { state } = useParams();
  const [orderCount, setOrderCount] = useState('');
  const [orders, setOrders] = useState([]);

  const handleOrderClick = (event, orderId) => {
    props.setDetailOrderId(orderId);
  };

  const getOrders = async () => {
    try {
      const url = `orders`;
      const params = {
        params: {
          state: state,
        },
      };
      const response = await axios.get(url, params);
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
          예약 <span className='order-count'>{orderCount}</span>건
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
