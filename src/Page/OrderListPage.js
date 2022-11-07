import React from 'react';
import Layout from '../Component/Layout';
import LogoNav from '../Component/LogoNav';
import '../scss/OrderListPage.scss';

function OrderList() {
  return (
    <div className='nexttonav'>
      <div className='orderlist-container'>
        <div className='left-container'>
          <div className='left-title-container'>
            <div className='left-title'>예약 3건</div>
          </div>
          <div className='order'>
            <div className='order-id'>배달 1234</div>
            <div className='order-number'>메뉴 2개</div>
            <div className='rsv-date'>예약 2022.10.03(월) 14:00</div>
          </div>
          <div className='order'>
            <div className='order-id'>배달 1235</div>
            <div className='order-number'>메뉴 1개</div>
            <div className='rsv-date'>예약 2022.10.04(화) 14:00</div>
          </div>
          <div className='order'>
            <div className='order-id'>배달 1236</div>
            <div className='order-number'>메뉴 3개</div>
            <div className='rsv-date'>예약 2022.10.05(수) 14:00</div>
          </div>
          <div className='order'>
            <div className='order-id'>배달 1236</div>
            <div className='order-number'>메뉴 3개</div>
            <div className='rsv-date'>예약 2022.10.05(수) 14:00</div>
          </div>
          <div className='order'>
            <div className='order-id'>배달 1236</div>
            <div className='order-number'>메뉴 3개</div>
            <div className='rsv-date'>예약 2022.10.05(수) 14:00</div>
          </div>
          <div className='order'>
            <div className='order-id'>배달 1236</div>
            <div className='order-number'>메뉴 3개</div>
            <div className='rsv-date'>예약 2022.10.05(수) 14:00</div>
          </div>
          <div className='order'>
            <div className='order-id'>배달 1236</div>
            <div className='order-number'>메뉴 3개</div>
            <div className='rsv-date'>예약 2022.10.05(수) 14:00</div>
          </div>
          <div className='order'>
            <div className='order-id'>배달 1236</div>
            <div className='order-number'>메뉴 3개</div>
            <div className='rsv-date'>예약 2022.10.05(수) 14:00</div>
          </div>
          <div className='order'>
            <div className='order-id'>배달 1236</div>
            <div className='order-number'>메뉴 3개</div>
            <div className='rsv-date'>예약 2022.10.05(수) 14:00</div>
          </div>
        </div>
        <div className='detail-container'>
          <div className='top'>
            <div className='id-and-button'>
              <span className='order-id'>배달 1234</span>
              <div className='state-button'>조리시작</div>
            </div>
            <div className='rsv-date'>예약 2022.10.03(월) 14:00</div>
            <div className='number-and-price'>
              <span className='order-number'>메뉴 3개</span>
              <span className='delimiter'>●</span>
              <span className='total-price'>총 73,000원</span>
            </div>
          </div>
          <div className='bottom'>
            <div className='request'>
              <div className='title'>요청사항</div>
              <div className='content'>커피는 산미있는 맛으로 부탁드려요.</div>
            </div>
            <div className='menu-info'>
              <div className='title'>메뉴정보</div>
              <div className='menu-container'>
                <div className='dinner'>
                  <div className='dinner-and-style'>
                    <div className='dinner-name'>프렌치 디너</div>
                    <div className='dinner-option'>
                      + 스테이크 1인분 추가 (20,000원)
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
                  <div className='dinner-and-style'>
                    <div className='dinner-name'>프렌치 디너</div>
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
            <div className='order-info'>
              <div className='title'>주문정보</div>
              <div className='content'>
                <div className='address subtitle'>배송지</div>
                <div className='address detail'>
                  서울특별시 동대문구 시립아파트 101-123
                </div>
                <div className='phone-number subtitle'>연락처</div>
                <div className='phone-number detail'>010-1234-5678</div>
                <div className='order-date subtitle'>주문일</div>
                <div className='order-date detail'>2022.10.31 (수) 17:00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderListPage() {
  return (
    <Layout>
      <LogoNav />
      <OrderList />
    </Layout>
  );
}

export default OrderListPage;
