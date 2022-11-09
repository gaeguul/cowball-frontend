import React from 'react';
import { NavLink } from 'react-router-dom';

function Logo() {
  return (
    <div className='logo-container'>
      <NavLink to='/orderlist'>
        <img
          className='MrDaebakLogo'
          alt='MrDaebakLogo'
          src='img/MrDaebakLogo.png'
        />
      </NavLink>
    </div>
  );
}

export default Logo;
