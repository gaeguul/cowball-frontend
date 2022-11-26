import React from 'react';
import StaffLayout from '../../Component/StaffLayout';
import StaffLogoNav from '../../Component/StaffLogoNav';
import OrderListForm from '../../Component/OrderListForm';
import '../../scss/OrderListPage.scss';

function OrderListPage() {
  return (
    <StaffLayout>
      <StaffLogoNav />
      <OrderListForm />
    </StaffLayout>
  );
}

export default OrderListPage;
