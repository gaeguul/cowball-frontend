import React from 'react';
import Layout from '../Component/Layout';
import LogoNav from '../Component/LogoNav';
import '../scss/StaffListPage.scss';

function StaffList() {
  return (
    <div className='nexttonav'>
      <div className='stafflist-container'>
        <div className='title-container'>
          <div className='title-main'>직원관리</div>
          <div className='title-detail'>
            Owner 권한에게만 보여지는 페이지입니다.
            <br></br>새로운 직원을 등록하고 고용된 직원들을 관리할 수 있습니다.
          </div>
        </div>
        <div className='content-container'></div>
      </div>
    </div>
  );
}

function StaffListPage() {
  return (
    <Layout>
      <LogoNav />
      <StaffList />
    </Layout>
  );
}

export default StaffListPage;
