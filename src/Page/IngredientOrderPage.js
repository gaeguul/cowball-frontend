import React from 'react';
import Layout from '../Component/Layout';
import LogoNav from '../Component/LogoNav';
import '../scss/IngredientOrderPage.scss';

function IngredientOrder() {
  return (
    <div className='nexttonav'>
      <div className='ingredientorder-container'>
        <div className='title-container'>
          <div className='title-main'>발주관리</div>
          <div className='title-detail'>
            발주를 신청하면 화요일과 목요일에 입고됩니다.
          </div>
        </div>
      </div>
    </div>
  );
}

function IngredientOrderPage() {
  return (
    <Layout>
      <LogoNav />
      <IngredientOrder />
    </Layout>
  );
}

export default IngredientOrderPage;
