import React from 'react';
import { createContext } from 'react';
import { useSetState } from 'react-use';

export const AuthContext = createContext(null);

const customerInitialState = {
  isCustomerLoginPending: true,
  isCustomerLogin: false,
  customerLoginError: null,
};
const stffInitialState = {
  isStaffLoginPending: true,
  isStaffLogin: false,
  staffLoginError: null,
};

export const ContextProvider = (props) => {
  const [customerState, setCustomerState] = useSetState(customerInitialState);
  const [stffState, setStaffState] = useSetState(stffInitialState);

  const setCustomerLoginPending = (isCustomerLoginPending) =>
    setCustomerState({ isCustomerLoginPending });
  const setCustomerLoginSuccess = (isCustomerLogin) =>
    setCustomerState({ isCustomerLogin });
  const setCustomerLoginError = (customerLoginError) =>
    setCustomerState({ customerLoginError });

  const setStaffLoginPending = (isStaffLoginPending) =>
    setStaffState({ isStaffLoginPending });
  const setStaffLoginSuccess = (isStaffLogin) =>
    setStaffState({ isStaffLogin });
  const setStaffLoginError = (staffLoginError) =>
    setStaffState({ staffLoginError });

  const customerLogin = (id, password) => {
    setCustomerLoginPending(true);
    setCustomerLoginSuccess(false);
    setCustomerLoginError(null);
    console.log(id, password);

    fetchCustomerLogin((id, password, error) => {
      console.log(id, password);

      setCustomerLoginPending(false);

      if (!error) {
        setCustomerLoginSuccess(true);
      } else {
        setCustomerLoginError(error);
      }
    });
  };

  const staffLogin = (id, password) => {
    setStaffLoginPending(true);
    setStaffLoginSuccess(false);
    setStaffLoginError(null);
    console.log(id, password);

    fetchStaffLogin((id, password, error) => {
      console.log(id, password);

      setStaffLoginPending(false);

      if (!error) {
        setStaffLoginSuccess(true);
      } else {
        setStaffLoginError(error);
      }
    });
  };

  const customerLogout = () => {
    setCustomerLoginPending(false);
    setCustomerLoginSuccess(false);
    setCustomerLoginError(null);
  };

  const staffLogout = () => {
    setStaffLoginPending(false);
    setStaffLoginSuccess(false);
    setStaffLoginError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        customerState,
        stffState,
        customerLogin,
        staffLogin,
        customerLogout,
        staffLogout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

const fetchCustomerLogin = (id, password, callback) => {
  setTimeout(() => {
    if (id === '11' && password == '22') {
      return callback(null);
    } else {
      return callback(new Error('아이디 및 비밀번호 오류'));
    }
  }, 1000);
};

const fetchStaffLogin = (id, password, callback) => {
  setTimeout(() => {
    if (id === '11' && password == '22') {
      return callback(null);
    } else {
      return callback(new Error('아이디 및 비밀번호 오류'));
    }
  }, 1000);
};
