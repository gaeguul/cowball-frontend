import React from 'react';
import Layout from '../Component/Layout';
import LogoNav from '../Component/LogoNav';
import '../scss/CustomerListPage.scss';

function CustomerList() {
  return (
    <div className='nexttonav'>
      <div className='customerlist-container'>
        <div className='title-container'>
          <div className='title-main'>고객관리</div>
          <div className='title-detail'>
            회원가입한 고객 목록을 볼 수 있습니다.
          </div>
        </div>
        <div className='content-container'>
          <table>
            <thead>
              <tr>
                <th>회원명</th>
                <th>회원아이디</th>
                <th>등급</th>
                <th>주문횟수</th>
                <th>가입일</th>
                <th>전화번호</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>김소공</td>
                <td>sogong</td>
                <td>
                  <div className='grade-container'>
                    <div className='vip-grade'>단골</div>
                  </div>
                </td>
                <td>100</td>
                <td>2022.10.01</td>
                <td>010-1234-5678</td>
              </tr>
              <tr>
                <td>나일반</td>
                <td>sogong</td>
                <td>
                  <div className='grade-container'>
                    <div className='default-grade'>일반</div>
                  </div>
                </td>
                <td>5</td>
                <td>2022.10.01</td>
                <td>010-1234-5678</td>
              </tr>
              <tr>
                <td>나일반</td>
                <td>sogong</td>
                <td>
                  <div className='grade-container'>
                    <div className='default-grade'>일반</div>
                  </div>
                </td>
                <td>5</td>
                <td>2022.10.01</td>
                <td>010-1234-5678</td>
              </tr>
              <tr>
                <td>나일반</td>
                <td>sogong</td>
                <td>
                  <div className='grade-container'>
                    <div className='default-grade'>일반</div>
                  </div>
                </td>
                <td>5</td>
                <td>2022.10.01</td>
                <td>010-1234-5678</td>
              </tr>
              <tr>
                <td>나일반</td>
                <td>sogong</td>
                <td>
                  <div className='grade-container'>
                    <div className='default-grade'>일반</div>
                  </div>
                </td>
                <td>5</td>
                <td>2022.10.01</td>
                <td>010-1234-5678</td>
              </tr>
              <tr>
                <td>김소공</td>
                <td>sogong</td>
                <td>
                  <div className='grade-container'>
                    <div className='vip-grade'>단골</div>
                  </div>
                </td>
                <td>100</td>
                <td>2022.10.01</td>
                <td>010-1234-5678</td>
              </tr>
              <tr>
                <td>김소공</td>
                <td>sogong</td>
                <td>
                  <div className='grade-container'>
                    <div className='vip-grade'>단골</div>
                  </div>
                </td>
                <td>100</td>
                <td>2022.10.01</td>
                <td>010-1234-5678</td>
              </tr>
              <tr>
                <td>나일반</td>
                <td>sogong</td>
                <td>
                  <div className='grade-container'>
                    <div className='default-grade'>일반</div>
                  </div>
                </td>
                <td>5</td>
                <td>2022.10.01</td>
                <td>010-1234-5678</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CustomerListPage() {
  return (
    <Layout>
      <LogoNav />
      <CustomerList />
    </Layout>
  );
}

export default CustomerListPage;
