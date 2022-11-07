import React from 'react';
import Layout from '../Component/Layout';
import LogoNav from '../Component/LogoNav';
import OrderList from '../Component/OrderList';
import '../scss/OrderListPage.scss';

function OrderListPage() {
  return (
    <Layout>
      <LogoNav />
      <OrderList />
    </Layout>
  );
}

export default OrderListPage;
