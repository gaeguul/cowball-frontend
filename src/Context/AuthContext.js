import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const ContextProvider = (props) => {
  const [isStaffLogin, setIsStaffLogin] = useState(false);
  const [staffToken, setStaffToken] = useState(null);
  const [isCustomerLogin, setIsCustomerLogin] = useState(false);
  const [customerToken, setCustomerToken] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        isStaffLogin,
        setIsStaffLogin,
        staffToken,
        setStaffToken,
        isCustomerLogin,
        setIsCustomerLogin,
        customerToken,
        setCustomerToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
