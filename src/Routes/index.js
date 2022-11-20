import React, { useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import {
  MainPage,
  OrderPage,
  CartPage,
  OrderCompletePage,
  MyOrderPage,
  MyPage,
  ChangePasswordPage,
  ChangeMyInfoPage,
  CustomerLoginPage,
  CustomerSignupPage,
  CustomerExitPage,
  OrderListPage,
  IngredientListPage,
  IngredientOrderPage,
  CustomerListPage,
  StaffLoginPage,
  StaffSignupPage,
  StaffListPage,
  NotFoundPage,
} from '../Page';
import { AuthContext } from '../Context/AuthContext';

function PrivateRoute({ staffAuth, customerAuth }) {
  const value = useContext(AuthContext);
  const isStaffLogin = value.isStaffLogin;
  const isCustomerLogin = value.isCustomerLogin;

  console.log('isStaffLogin', isStaffLogin);
  console.log('isCustomerLogin', isCustomerLogin);

  if (!staffAuth && !customerAuth) {
    //로그인, 회원가입 페이지
    return isStaffLogin ? (
      <Navigate replace to='/staff' />
    ) : isCustomerLogin ? (
      <Navigate replace to='/' />
    ) : (
      <Outlet />
    );
  } else if (staffAuth) {
    //직원페이지
    return !isStaffLogin ? <Navigate replace to='/stafflogin' /> : <Outlet />;
  } else {
    //고객페이지
    return !isCustomerLogin ? <Navigate replace to='/login' /> : <Outlet />;
  }
}

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/**로그인 안해야지만 접근 가능 */}
        <Route
          element={<PrivateRoute customerAuth={false} staffAuth={false} />}
        >
          <Route path='/login' element={<CustomerLoginPage />} />
          <Route path='/signup' element={<CustomerSignupPage />} />
          <Route path='/stafflogin' element={<StaffLoginPage />} />
          <Route path='/staffsignup' element={<StaffSignupPage />} />
        </Route>

        {/**고객 로그인 해야만 접근 가능 */}
        <Route element={<PrivateRoute customerAuth={true} staffAuth={false} />}>
          <Route path='/' element={<MainPage />} />
          <Route path='/order/:dinnerId' element={<OrderPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/ordercomplete' element={<OrderCompletePage />} />
          <Route path='/myorder' element={<MyOrderPage />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/mypage/changepw' element={<ChangePasswordPage />} />
          <Route path='/mypage/changemyinfo' element={<ChangeMyInfoPage />} />
          <Route path='/exit' element={<CustomerExitPage />} />
        </Route>

        {/**직원 로그인 해야만 접근 가능 */}

        <Route element={<PrivateRoute staffAuth={true} />}>
          <Route
            path='/staff/orderlist'
            element={<Navigate replace to='/staff/orderlist/waiting' />}
          />
          <Route path='/staff/orderlist/:state' element={<OrderListPage />} />
          <Route
            path='/staff/ingredientlist'
            element={<IngredientListPage />}
          />
          <Route
            path='/staff/ingredientorder'
            element={<IngredientOrderPage />}
          />
          <Route path='/staff/customerlist' element={<CustomerListPage />} />
          <Route path='/staff/stafflist' element={<StaffListPage />} />
          <Route
            path='/staff/*'
            element={<Navigate replace to='/staff/orderlist/waiting' />}
          />
        </Route>

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
