import React, { useState } from 'react';
import { useEffect } from 'react';
import StaffLayout from '../Component/StaffLayout';
import StaffLogoNav from '../Component/StaffLogoNav';
import '../scss/CustomerListPage.scss';
import axios from 'axios';
// import { parseWithOptions } from 'date-fns/fp';

// const staffId = localStorage.getItem('staffId');
const staffToken = localStorage.getItem('staffToken');

function CustomerList() {
  const [users, setUsers] = useState([]);

  const getCustomers = async () => {
    try {
      const url = `users`;
      const headers = {
        headers: {
          Authorization: `Bearer ${staffToken}`,
        },
      };
      const response = await axios.get(url, headers);
      console.log('response.data2', response.data.items);
      setUsers(response.data.itmes);
      console.log('오잉', users);
    } catch (error) {
      console.log('why...', error);
    }
  };

  function UserLine(props) {
    const key = props.key;
    const user = props.user;
    return (
      <tr>
        <td>{user.userName}</td>
        <td>{key}</td>
        <td>
          <div className='grade-container'>
            {user.grade == 0 ? (
              <div className='default-grade'>일반</div>
            ) : (
              <div className='vip-grade'>단골</div>
            )}
          </div>
        </td>
        <td>{user.orderCount}</td>
        <td>{user.JoinDate}</td>
        <td>{user.phoneNumber}</td>
      </tr>
    );
  }

  useEffect(() => {
    getCustomers();
    // console.log('here?');
    // console.log('오잉', users);
  }, []);

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
              {users &&
                users.map((user) => {
                  return <UserLine key={user.userId} user={user} />;
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CustomerListPage() {
  return (
    <StaffLayout>
      <StaffLogoNav />
      <CustomerList />
    </StaffLayout>
  );
}

export default CustomerListPage;
