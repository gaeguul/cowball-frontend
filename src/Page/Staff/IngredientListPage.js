import React from 'react';
import StaffLayout from '../../Component/StaffLayout';
import StaffLogoNav from '../../Component/StaffLogoNav';
import IngredientList from '../../Component/IngredientList';
import '../../scss/IngredientListPage.scss';

function IngredientListPage() {
  return (
    <StaffLayout>
      <StaffLogoNav />
      <IngredientList />
    </StaffLayout>
  );
}

export default IngredientListPage;
