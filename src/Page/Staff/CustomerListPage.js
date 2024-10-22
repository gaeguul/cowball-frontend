import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';

import StaffLayout from '../../Component/StaffLayout';
import StaffLogoNav from '../../Component/StaffLogoNav';
import '../../scss/CustomerListPage.scss';

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const staffToken = localStorage.getItem('staffToken');

    const getCustomers = async () => {
      let page = 1;
      let pageMax;

      const url = `users`;
      const result = [];
      const options = {
        headers: {
          Authorization: `Bearer ${staffToken}`,
        },
        params: {
          order_by: 'order_count',
          order_direction: 'DESC',
        },
      };

      do {
        await axios
          .get(`${url}?page=${page}`, options)
          .then((res) => res.data)
          .then((it) => {
            if (pageMax === undefined) pageMax = it.pageMax;
            result.push(...it.items);
            console.log(it.items);
          })
          .catch((e) => console.log(e));
      } while (++page <= pageMax);

      setCustomers(result);
    };
    getCustomers();
  }, []);

  const checkGrade = (value) => {
    const GRADE_NAME = new Map([
      [0, '일반'],
      [1, '단골'],
    ]);

    return GRADE_NAME.get(value);
  };

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
              {customers.map((customer) => {
                const joinDate = format(
                  parseISO(customer.joinDate),
                  'yyyy.MM.dd',
                );
                const role = checkGrade(customer.grade);
                return (
                  <tr key={customer.userId}>
                    <td>{customer.userName}</td>
                    <td>{customer.userId}</td>
                    <td>
                      <div className='grade-container'>
                        {role === '단골' ? (
                          <div className='vip-grade'>{role}</div>
                        ) : (
                          <div className='default-grade'>{role}</div>
                        )}
                      </div>
                    </td>
                    <td>{customer.orderCount}</td>
                    <td>{joinDate}</td>
                    <td>{customer.phoneNumber}</td>
                  </tr>
                );
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
