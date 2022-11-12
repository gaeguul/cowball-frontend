import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  MainPage,
  OrderPage,
  CartPage,
  CartCompletePage,
  MyOrderPage,
  MyPage,
  ChangePasswordPage,
  ChangeMyInfoPage,
  CustomerLoginPage,
  CustomerSignupPage,
  OrderListPage,
  IngredientListPage,
  IngredientOrderPage,
  CustomerListPage,
  StaffLoginPage,
  StaffSignupPage,
  StaffListPage,
  NotFoundPage,
} from '../Page';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<CustomerLoginPage />} />
        <Route path='/signup' element={<CustomerSignupPage />} />

        <Route exact path='/' element={<MainPage />} />
        <Route path='/order/:' element={<OrderPage />} />

        <Route path='/cart' element={<CartPage />} />
        <Route path='/cart/complete' element={<CartCompletePage />} />
        <Route path='/myorder' element={<MyOrderPage />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/mypage/changepw' element={<ChangePasswordPage />} />
        <Route path='/mypage/changemyinfo' element={<ChangeMyInfoPage />} />

        <Route path='/stafflogin' element={<StaffLoginPage />} />
        <Route path='/staffsignup' element={<StaffSignupPage />} />

        <Route path='/orderlist' element={<OrderListPage />} />
        <Route path='/ingredientlist' element={<IngredientListPage />} />
        <Route path='/ingredientorder' element={<IngredientOrderPage />} />
        <Route path='/customerlist' element={<CustomerListPage />} />
        <Route path='/stafflist' element={<StaffListPage />} />
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
