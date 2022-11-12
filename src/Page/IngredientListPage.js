import React from 'react';
import StaffLayout from '../Component/StaffLayout';
import LogoNav from '../Component/StaffLogoNav';
import IngredientList from '../Component/IngredientList';
import '../scss/IngredientListPage.scss';

function IngredientListPage() {
  return (
    <StaffLayout>
      <LogoNav />
      <IngredientList />
    </StaffLayout>
  );
}

export default IngredientListPage;
