import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

function Nav() {
  const value = useContext(AuthContext);
  const setIsStaffLogin = value.setIsStaffLogin;

  const isOwner = true; //주인이라면 true, 일반직원이라면 false
  //isOwner가 true이면 '직원관리' 페이지 노출됨
  const handleLogoutButtonClick = () => {
    //logout 처리
    localStorage.clear();
    setIsStaffLogin(false);
  };
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
        <div className='nav-title nav-manage'>계정</div>
        <div
          className='logout-button user-button'
          onClick={handleLogoutButtonClick}
        >
          로그아웃
        </div>
      </div>
    </div>
  );
}

export default Nav;
