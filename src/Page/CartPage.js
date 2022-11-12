import React from 'react';
import CustomerLayout from '../Component/CustomerLayout';
import Header from '../Component/Header';
import '../scss/CartPage.scss';

function CartPage() {
  return (
    <CustomerLayout>
      <Header />
      <div className='main-container'>
        <div className='cart-container'>
          <div className='main-title'>장바구니</div>
          <div className='dinner-list-container'>
            <div className='menu-info'>
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
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}

export default CartPage;
