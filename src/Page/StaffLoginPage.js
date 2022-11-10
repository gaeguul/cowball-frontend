import React from 'react';
import Layout from '../Component/Layout';
import '../scss/StaffLoginPage.scss';

function StaffLoginLogo() {
  return <div className='staff-login-logo-container'>mr daeback staff</div>;
}

function StaffLoginForm() {
  return <div className='staff-login-form-container'></div>;
}

function StaffLoginBox() {
  return (
    <div className='staff-login-box'>
      <StaffLoginLogo />
      <StaffLoginForm />
    </div>
  );
}

function StaffLogin() {
  return (
    <div className='staff-login-container'>
      <StaffLoginBox />
    </div>
  );
}
function StaffLoginPage() {
  return (
    <Layout>
      <StaffLogin />
    </Layout>
  );
}

export default StaffLoginPage;
