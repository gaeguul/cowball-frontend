import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';

import StaffLayout from '../../Component/StaffLayout';
import StaffLogoNav from '../../Component/StaffLogoNav';
import '../../scss/StaffListPage.scss';

const staffToken = localStorage.getItem('staffToken');

function checkStaffRole(value) {
  const STAFF_ROLE_NAME = new Map([
    [1, '조리(미승인)'],
    [2, '배달(미승인)'],
    [17, '조리직원'],
    [18, '배달직원'],
    [32, '사장님'],
  ]);

  return STAFF_ROLE_NAME.get(value);
}

function RegisterStaffButton({ staffId }) {
  const handleRegisterStaffButtonClick = async () => {
    try {
      const url = `staff/${staffId}/approve`;
      const response = await axios.post(url, {
        headers: {
          Authorization: `Bearer ${staffToken}`,
        },
      });
      console.log(response);
      alert(`직원을 등록했습니다.`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='register-staff-button-container'>
      <div
        onClick={handleRegisterStaffButtonClick}
        className='register-staff-button'
      >
        <div className='button-title'>직원등록</div>
      </div>
    </div>
  );
}

function DeleteStaffButton({ staffId }) {
  const handleDeleteStaffButtonClick = async () => {
    try {
      const url = `staff/${staffId}`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${staffToken}`,
        },
      });
      console.log(response);
      alert(`직원을 삭제했습니다.`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='delete-staff-button-container'>
      <div
        onClick={handleDeleteStaffButtonClick}
        className='delete-staff-button'
      >
        <div className='button-title'>삭제</div>
      </div>
    </div>
  );
}

function AppliedStaffsComponent({ appliedStaffs }) {
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
            {appliedStaffs.map((appliedStaff) => {
              const joinDate = format(
                parseISO(appliedStaff.joinDate),
                'yyyy.MM.dd',
              );
              const role = checkStaffRole(appliedStaff.role);

              return (
                <tr key={appliedStaff.staffId}>
                  <td>{appliedStaff.staffName}</td>
                  <td>{appliedStaff.staffId}</td>
                  <td>{role}</td>
                  <td>{joinDate}</td>
                  <td>
                    <RegisterStaffButton staffId={appliedStaff.staffId} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmployedStaffsComponent({ employedStaffs }) {
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
            {employedStaffs.map((employedStaff) => {
              const joinDate = format(
                parseISO(employedStaff.joinDate),
                'yyyy.MM.dd',
              );
              const role = checkStaffRole(employedStaff.role);
              return (
                <tr key={employedStaff.staffId}>
                  <td>{employedStaff.staffName}</td>
                  <td>{employedStaff.staffId}</td>
                  <td>{role}</td>
                  <td>{joinDate}</td>
                  <td>{employedStaff.phoneNumber}</td>
                  <td>
                    <DeleteStaffButton staffId={employedStaff.staffId} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StaffList() {
  const [employedStaffs, setEmployedStaffs] = useState([]);
  const [appliedStaffs, setAppliedStaffs] = useState([]);

  useEffect(() => {
    const getStaffs = async () => {
      let page = 1;
      let pageMax;

      const url = `staff`;
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

      const employedResult = result.filter((staff) => staff.role > 2);
      const appliedResult = result.filter((staff) => staff.role <= 2);

      setEmployedStaffs(employedResult);
      setAppliedStaffs(appliedResult);
    };
    getStaffs();
  }, []);

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
          <AppliedStaffsComponent appliedStaffs={appliedStaffs} />
          <EmployedStaffsComponent employedStaffs={employedStaffs} />
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
