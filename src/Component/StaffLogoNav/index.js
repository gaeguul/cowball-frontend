import React from 'react';
import Logo from './Logo';
import TopMenu from './TopMenu';
import Nav from './Nav';

function StaffLogoNav() {
  return (
    <div className='logo-nav-container'>
      <Logo />
      <TopMenu />
      <Nav />
    </div>
  );
}

export default StaffLogoNav;
