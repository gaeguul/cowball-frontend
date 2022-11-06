import React from 'react';
import { NavLink } from 'react-router-dom';

function LogoNav() {
  return (
    <div className='logo-nav-container'>
      <div className='logo-container'>
        <NavLink to='/orderlist'>
          <img
            className='MrDaebakLogo'
            alt='MrDaebakLogo'
            src='img/MrDaebakLogo.png'
          />
        </NavLink>
      </div>
      <div className='nav-container'>
        <div className='nav-container-inner'>
          <div className='nav-title'>주문목록</div>
          <div>
            <NavLink to='/orderlist'>예약</NavLink>
          </div>
          <div>
            <NavLink to='/orderlist'>조리중</NavLink>
          </div>
          <div>
            <NavLink to='/orderlist'>배달중</NavLink>
          </div>
          <div>
            <NavLink to='/orderlist'>완료</NavLink>
          </div>
          <div className='nav-title nav-manage'>우리가게관리</div>
          <div>
            <NavLink to='/ingredientlist'>재고현황</NavLink>
          </div>
          <div>
            <NavLink to='/ingredientorder'>발주관리</NavLink>
          </div>
          <div>
            <NavLink to='/customerlist'>단골관리</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoNav;
