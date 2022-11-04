import React from 'react';
import '../scss/OrderListPage.scss';

function OrderListPage() {
  return (
    <div className='layout-container'>
      <div className='logo-container'>Mr. Daebak</div>
      <div className='main-container'>
        <div className='nav-container'>
          <div>주문목록</div>
          <div>예약</div>
          <div>조리중</div>
          <div>배달중</div>
          <div>완료</div>
          <div>우리가게 관리</div>
          <div>재고현황</div>
          <div>발주관리</div>
          <div>단골관리</div>
        </div>
        <div className='list-container'>예약 3건</div>
        <div className='detail-container'>배달 1234</div>
      </div>
    </div>
  );
}

export default OrderListPage;
