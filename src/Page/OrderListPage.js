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
          <div className='detail-title-container'>배달 1234</div>
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
