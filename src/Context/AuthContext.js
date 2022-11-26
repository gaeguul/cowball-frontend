import React, { createContext, useState } from 'react';
import { useEffect } from 'react';

export const AuthContext = createContext(null);

export const ContextProvider = (props) => {
  const [isStaffLogin, setIsStaffLogin] = useState(false);
  const [isCustomerLogin, setIsCustomerLogin] = useState(false);

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

  return (
    <AuthContext.Provider
      value={{
        isStaffLogin,
        setIsStaffLogin,
        isCustomerLogin,
        setIsCustomerLogin,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
