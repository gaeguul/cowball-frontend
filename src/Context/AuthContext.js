import React, { createContext, useState } from 'react';
import { useEffect } from 'react';

export const AuthContext = createContext(null);

/*

const getInitialCustomerId = () => {
  const customerId = localStorage.getItem('customerId');
  return customerId ? customerId : null;
};
const getInitialCustomerToken = () => {
  const customerToken = localStorage.getItem('customerToken');
  return customerToken ? customerToken : null;
};
const getInitialStaffId = () => {
  const staffId = localStorage.getItem('staffId');
  return staffId ? staffId : null;
};
const getInitialStaffToken = () => {
  const staffToken = localStorage.getItem('staffToken');
  return staffToken ? staffToken : null;
};

*/

export const ContextProvider = (props) => {
  const [isStaffLogin, setIsStaffLogin] = useState(false);
  const [staffToken, setStaffToken] = useState(null);
  const [staffId, setStaffId] = useState(null);

  const [isCustomerLogin, setIsCustomerLogin] = useState(false);
  const [customerToken, setCustomerToken] = useState(null);
  const [customerId, setCustomerId] = useState(null);

  useEffect(() => {
    /**고객 */
    if (!localStorage.getItem('customerToken')) {
      setIsCustomerLogin(false);
    } else {
      setIsCustomerLogin(true);
    }
    /**직원 */
    if (!localStorage.getItem('staffToken')) {
      setIsStaffLogin(false);
    } else {
      setIsStaffLogin(true);
    }
  }, []);

  // useEffect(() => {
  //   localStorage.clear();

  //   localStorage.setItem('customerToken', customerToken);
  //   localStorage.setItem('customerId', customerId);

  //   if (customerToken === null) {
  //     setIsCustomerLogin(false);
  //   } else {
  //     setIsCustomerLogin(true);
  //   }
  // }, [customerToken, customerId]);

  // useEffect(() => {
  //   localStorage.clear();

  //   localStorage.setItem('staffToken', staffToken);
  //   localStorage.setItem('staffId', staffId);

  //   console.log('staffToken === null', staffToken === null);

  //   if (staffToken === null || staffToken === undefined) {
  //     setIsStaffLogin(false);
  //   } else {
  //     setIsStaffLogin(true);
  //   }
  // }, [staffToken, staffId]);

  /**
   * 컴포넌트는 직접 isCustomerLogin을 변경할 수 없다
   * (즉, setISCustomerLogin 사용 불가능, 읽기만 가능)
   * isCustomerLogin은 로컬스토리지 여부에 따라 결정된다
   */

  // const setCustomerLocalStorage = useCallback(() => {
  //   /**
  //    * customerToken과 customerId가 변하면
  //    * localStorage에 추가한다
  //    * 로컬스토리지 여부에 따라 isCustomerLoign을
  //    * true/false로 변경한다
  //    */
  //   console.log('customerToken 또는 customerId 변경됨');

  //   localStorage.clear();
  //   localStorage.setItem('customerId', customerId);
  //   localStorage.setItem('customerToken', customerToken);

  //   if (localStorage.getItem('customerToken') === null) {
  //     setIsCustomerLogin(false);
  //   } else {
  //     setIsCustomerLogin(true);
  //   }
  // }, [customerToken, customerId]);

  // useEffect(() => {
  //   if (localStorage.getItem('customerToken') === null) {
  //     window.location.replace('/login');
  //   } else {
  //     setCustomerToken(localStorage.getItem('customerToken'));
  //     setCustomerId(localStorage.getItem('customerId'));
  //   }
  // }, []);

  // useEffect(() => {
  //   setCustomerLocalStorage();
  // }, [setCustomerLocalStorage]);

  // const setStaffLocalStorage = useCallback(() => {
  //   console.log('staffToken 또는 staffId 변경됨');

  //   localStorage.clear();
  //   localStorage.setItem('staffId', staffId);
  //   localStorage.setItem('staffToken', staffToken);

  //   if (localStorage.getItem('customerToken') === null) setIsStaffLogin(false);
  // }, [staffToken, staffId]);

  // useEffect(() => {
  //   setStaffLocalStorage();
  // }, [setStaffLocalStorage]);

  return (
    <AuthContext.Provider
      value={{
        isStaffLogin,
        setIsStaffLogin,
        staffToken,
        setStaffToken,
        staffId,
        setStaffId,
        isCustomerLogin,
        setIsCustomerLogin,
        customerToken,
        setCustomerToken,
        customerId,
        setCustomerId,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
