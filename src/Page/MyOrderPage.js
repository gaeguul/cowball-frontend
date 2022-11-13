import React from 'react';
import CustomerLayout from '../Component/CustomerLayout';
import Header from '../Component/Header';
import '../scss/MyOrderPage.scss';

function MyOrderComponent() {
  return (
    <div className='myorder-layout-container'>
      <div className='myorder-component-container'>
        <div className='main-title'>주문내역</div>
        <div className='myorder-list-container'>
          <div className='single-order-container'>
            <div className='left-container'>
              <div className='left-top-title'>
                <span>11월 27일 주문</span>
                <span className='dot'>•</span>
                <span className='order-state'>완료</span>
              </div>
              <div className='myorder-dinner'>
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

              <div className='total-container'>
                <div className='title'>주문금액</div>
                <div className='total-price'>73,000원</div>
              </div>
            </div>
            <div className='right-container'>
              <div className='right-box'>
                <div className='delivery-info-container'>
                  <div className='title'>배달정보</div>
                  <div className='content-container'>
                    <div className='rsv-date-title content-title'>예약일시</div>
                    <div className='rsv-date second-col'>
                      2022.01.01 (월) 19:00
                    </div>
                    <div className='address-title content-title'>배송지</div>
                    <div className='address-input-container second-col'>
                      서울특별시 동대문구
                    </div>
                    <div className='request-title content-title'>요청사항</div>
                    <div className='request-input-container second-col'>
                      맛있게 해주세요 ^^
                    </div>
                    <div className='card-number-title content-title'>
                      카드번호
                    </div>
                    <div className='card-number second-col'>
                      1235-1235-1235-1235
                    </div>
                  </div>
                </div>
                <div className='payment-info-container'>
                  <div className='title'>결제금액</div>
                  <div className='content-container'>
                    <div className='total-price-title content-title'>
                      주문금액
                    </div>
                    <div className='total-price-number'>80,000원</div>
                    <div className='discount-price-title content-title'>
                      단골할인금액
                    </div>
                    <div className='discount-price-number'>- 5,000원</div>
                    <div className='payment-price-title  content-title'>
                      총 결제금액
                    </div>
                    <div className='payment-price-number '>75,000원</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='single-order-container'>
            <div className='left-container'>
              <div className='left-top-title'>
                <span>11월 27일 주문</span>
                <span className='dot'>•</span>
                <span className='order-state'>배달중</span>
              </div>
              <div className='myorder-dinner'>
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
              <div className='myorder-dinner'>
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
                <div className='title'>주문금액</div>
                <div className='total-price'>73,000원</div>
              </div>
            </div>
            <div className='right-container'>
              <div className='right-box'>
                <div className='delivery-info-container'>
                  <div className='title'>배달정보</div>
                  <div className='content-container'>
                    <div className='rsv-date-title content-title'>예약일시</div>
                    <div className='rsv-date second-col'>
                      2022.01.01 (월) 19:00
                    </div>
                    <div className='address-title content-title'>배송지</div>
                    <div className='address-input-container second-col'>
                      서울특별시 동대문구
                    </div>
                    <div className='request-title content-title'>요청사항</div>
                    <div className='request-input-container second-col'>
                      맛있게 해주세요 ^^
                    </div>
                    <div className='card-number-title content-title'>
                      카드번호
                    </div>
                    <div className='card-number second-col'>
                      1235-1235-1235-1235
                    </div>
                  </div>
                </div>
                <div className='payment-info-container'>
                  <div className='title'>결제금액</div>
                  <div className='content-container'>
                    <div className='total-price-title content-title'>
                      주문금액
                    </div>
                    <div className='total-price-number'>80,000원</div>
                    <div className='discount-price-title content-title'>
                      단골할인금액
                    </div>
                    <div className='discount-price-number'>- 5,000원</div>
                    <div className='payment-price-title  content-title'>
                      총 결제금액
                    </div>
                    <div className='payment-price-number '>75,000원</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MyOrderPage() {
  return (
    <CustomerLayout>
      <Header />
      <MyOrderComponent />
    </CustomerLayout>
  );
}

export default MyOrderPage;
