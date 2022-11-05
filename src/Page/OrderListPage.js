import React from 'react';
import { NavLink } from 'react-router-dom';
import '../scss/OrderListPage.scss';

function OrderListPage() {
  return (
    <div className='layout-container'>
      <div className='logo-container'>
        <NavLink to='/orderlist'>
          <img
            className='MrDaebakLogo'
            alt='MrDaebakLogo'
            src='img/MrDaebakLogo.png'
          />
        </NavLink>
      </div>
      <div className='main-container'>
        <div className='nav-container'>
          <ul className='nav-orderlist-container'>
            <li>주문목록</li>
            <li>
              <NavLink to='/orderlist'>예약</NavLink>
            </li>
            <li>
              <NavLink to='/orderlist'>조리중</NavLink>
            </li>
            <li>
              <NavLink to='/orderlist'>배달중</NavLink>
            </li>
            <li>
              <NavLink to='/orderlist'>완료</NavLink>
            </li>
          </ul>
          <ul className='nav-management-container'>
            <li>우리가게관리</li>
            <li>
              <NavLink to='/ingredientlist'>재고현황</NavLink>
            </li>
            <li>
              <NavLink to='/ingredientorder'>발주관리</NavLink>
            </li>
            <li>
              <NavLink to='/customerlist'>단골관리</NavLink>
            </li>
          </ul>
        </div>
        <div className='orderlist-container'>
          <div className='orderlist-title'>예약 3건</div>
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
        </div>
        <div className='orderdetail-container'>
          <div className='top'>
            <div className='id-and-button'>
              <span className='order-id'>배달 1234</span>
              <div className='state-button'>조리시작</div>
            </div>
            <div className='rsv-date'>예약 2022.10.03(월) 14:00</div>
            <div className='number-and-price'>
              <span className='order-number'>메뉴 3개</span>
              <span>●</span>
              <span className='total-price'>총 73,000원</span>
            </div>
          </div>
          <div className='middle'>
            <div className='request'>
              <div className='title'>요청사항</div>
              <div className='content'>커피는 산미있는 맛으로 부탁드려요.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderListPage;
