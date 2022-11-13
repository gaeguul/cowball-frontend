import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Component/Header';
import CustomerLayout from '../Component/CustomerLayout';
import { BsCheckCircle } from 'react-icons/bs';
import '../scss/OrderCompletePage.scss';

function OrderCompletePage() {
  return (
    <CustomerLayout>
      <Header />
      <div className='center-container'>
        <div className='order-complete-container'>
          <div className='top-title'>
            <BsCheckCircle />
            <span className='title-text'>주문이 완료되었습니다.</span>
          </div>
          <div className='order-info-container'>
            <div className='info-title'>주문번호</div>
            <div className='info-content'>202210101234</div>
            <div className='info-title'>총 결제금액</div>
            <div className='info-content'>75,000원</div>
            <div className='info-title'>예약일시</div>
            <div className='info-content'>2022.10.31 (월) 19:00</div>
          </div>
          <div className='goto-main-button-container'>
            <Link to='/'>
              <div className='goto-main-button'>메인으로 이동</div>
            </Link>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}

export default OrderCompletePage;
