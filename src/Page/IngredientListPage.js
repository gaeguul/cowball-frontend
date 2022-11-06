import React from 'react';
import Layout from '../Component/Layout';
import LogoNav from '../Component/LogoNav';
import IngredientList from '../Component/IngredientList';
import '../scss/IngredientListPage.scss';

function IngredientListPage() {
  return (
    <Layout>
      <LogoNav />
      <IngredientList />
    </Layout>
  );
}

export default IngredientListPage;
