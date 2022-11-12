import React from 'react';
import StaffLayout from '../Component/StaffLayout';
import StaffLogoNav from '../Component/StaffLogoNav';
import IngredientOrder from '../Component/IngredientOrder';
import '../scss/IngredientOrderPage.scss';

function IngredientOrderPage() {
  return (
    <StaffLayout>
      <StaffLogoNav />
      <IngredientOrder />
    </StaffLayout>
  );
}

export default IngredientOrderPage;
