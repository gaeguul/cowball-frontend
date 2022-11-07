import React from 'react';
import Layout from '../Component/Layout';
import LogoNav from '../Component/LogoNav';
import IngredientOrder from '../Component/IngredientOrder';
import '../scss/IngredientOrderPage.scss';

function IngredientOrderPage() {
  return (
    <Layout>
      <LogoNav />
      <IngredientOrder />
    </Layout>
  );
}

export default IngredientOrderPage;
