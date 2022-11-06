import React from 'react';
import '../scss/IngredientListPage.scss';

import Layout from '../Component/Layout';
import LogoNav from '../Component/LogoNav';
import IngredientList from '../Component/IngredientList';

function IngredientListPage() {
  return (
    <Layout>
      <LogoNav />
      <IngredientList />
    </Layout>
  );
}

export default IngredientListPage;
