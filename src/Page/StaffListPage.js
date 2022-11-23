import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StaffLayout from '../Component/StaffLayout';
import StaffLogoNav from '../Component/StaffLogoNav';
import '../scss/StaffListPage.scss';

// const staffId = localStorage.getItem('staffId');
const staffToken = localStorage.getItem('staffToken');

function RegisterStaffButton() {
  return (
    <div className='register-staff-button-container'>
      <div className='register-staff-button'>
        <div className='button-title'>직원등록</div>
      </div>
    </div>
  );
}
function DeleteStaffButton() {
  return (
    <div className='delete-staff-button-container'>
      <div className='delete-staff-button'>
        <div className='button-title'>삭제</div>
      </div>
    </div>
  );
}

function AppliedStaffsComponent() {
  return (
    <div className='applied-staff-list-container'>
      <div className='title'>회원가입 신청한 직원</div>
      <div className='applied-staff-list'>
        <table>
          <thead>
            <tr>
              <th>직원명</th>
              <th>직원아이디</th>
              <th>역할</th>
              <th>신청일</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>김소공</td>
              <td>sogong</td>
              <td>배달</td>
              <td>2022.11.01</td>
              <td>
                <RegisterStaffButton />
              </td>
            </tr>
            <tr>
              <td>김소공</td>
              <td>sogong</td>
              <td>배달</td>
              <td>2022.11.01</td>
              <td>
                <RegisterStaffButton />
              </td>
            </tr>
            <tr>
              <td>김소공</td>
              <td>sogong</td>
              <td>배달</td>
              <td>2022.11.01</td>
              <td>
                <RegisterStaffButton />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmployedStaffsComponent() {
  const [employedStaffs, setEmployedStaffs] = useState([]);

  const getEmployedStaffs = async () => {
    let page = 1;
    let pageMax;

    const url = `users`;
    const result = [];
    const headers = {
      headers: {
        Authorization: `Bearer ${staffToken}`,
      },
    };

    do {
      await axios
        .get(`${url}?page=${page}`, headers)
        .then((res) => res.data)
        .then((it) => {
          if (pageMax === undefined) pageMax = it.pageMax;
          result.push(...it.items);
        })
        .catch((e) => console.log(e));
    } while (++page <= pageMax);

    console.log(result);
    setEmployedStaffs(result);
  };

  useEffect(() => {
    getEmployedStaffs();
    console.log(employedStaffs);
  }, []);

  return (
    <div className='employed-staff-list-container'>
      <div className='title'>고용된 직원</div>
      <div className='employed-staff-list'>
        <table>
          <thead>
            <tr>
              <th>직원명</th>
              <th>직원아이디</th>
              <th>역할</th>
              <th>가입일</th>
              <th>전화번호</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* {
              employedStaffs.map((staff)=> {
                <EmployedStaffComponent key={staff.}
                staff={staff}/>
              })
            } */}
            <tr>
              <td>김소공</td>
              <td>sogong</td>
              <td>배달</td>
              <td>2022.11.01</td>
              <td>010-1234-1234</td>
              <td>
                <DeleteStaffButton />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

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
        <div className='content-container'>
          <AppliedStaffsComponent />
          <EmployedStaffsComponent />
        </div>
      </div>
    </div>
  );
}

function StaffListPage() {
  return (
    <StaffLayout>
      <StaffLogoNav />
      <StaffList />
    </StaffLayout>
  );
}

export default StaffListPage;
