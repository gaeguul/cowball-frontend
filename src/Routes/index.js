import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  MainPage,
  OrderListPage,
  IngredientListPage,
  IngredientOrderPage,
  CustomerListPage,
  StaffLoginPage,
  StaffSignupPage,
  StaffListPage,
} from '../Page';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/orderlist' element={<OrderListPage />} />
        <Route path='/ingredientlist' element={<IngredientListPage />} />
        <Route path='/ingredientorder' element={<IngredientOrderPage />} />
        <Route path='/customerlist' element={<CustomerListPage />} />
        <Route path='/stafflogin' element={<StaffLoginPage />} />
        <Route path='/staffsignup' element={<StaffSignupPage />} />
        <Route path='/stafflist' element={<StaffListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
