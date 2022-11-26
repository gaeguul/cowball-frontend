import React from 'react';
import StaffLayout from '../../Component/StaffLayout';
import StaffLogoNav from '../../Component/StaffLogoNav';
import OrderList from '../../Component/OrderList';
import '../../scss/OrderListPage.scss';

function OrderListPage() {
  return (
    <StaffLayout>
      <StaffLogoNav />
      <OrderList />
    </StaffLayout>
  );
}

export default OrderListPage;
