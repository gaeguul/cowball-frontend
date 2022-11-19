import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
  const isOwner = true; //주인이라면 true, 일반직원이라면 false
  //isOwner가 true이면 '직원관리' 페이지 노출됨

  return (
    <div className='nav-container'>
      <div className='nav-container-inner'>
        <div className='nav-title'>주문목록</div>
        <div>
          <NavLink to='/staff/orderlist/hold'>대기</NavLink>
        </div>
        <div>
          <NavLink to='/staff/orderlist/waiting'>예약</NavLink>
        </div>
        <div>
          <NavLink to='/staff/orderlist/cooking'>조리중</NavLink>
        </div>
        <div>
          <NavLink to='/staff/orderlist/in-delivery'>배달중</NavLink>
        </div>
        <div>
          <NavLink to='/staff/orderlist/done'>완료</NavLink>
        </div>
        <div className='nav-title nav-manage'>우리가게관리</div>
        <div>
          <NavLink to='/staff/ingredientlist'>재고현황</NavLink>
        </div>
        <div>
          <NavLink to='/staff/ingredientorder'>발주관리</NavLink>
        </div>
        <div>
          <NavLink to='/staff/customerlist'>고객관리</NavLink>
        </div>
        {isOwner ? (
          <div>
            <NavLink to='/staff/stafflist'>직원관리</NavLink>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Nav;
