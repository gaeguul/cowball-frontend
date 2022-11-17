import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import OrderNumberButton from './OrderNumberButton';

import { BiPlus, BiMinus } from 'react-icons/bi';

function OrderNumberButton(props) {
  const setOrderCount = props.setOrderCount;
  const orderCount = props.orderCount;

  const decreaseOrderNumber = () => {
    if (orderCount == 0) {
      console.log('더 이상 줄일 수 없습니다');
    } else {
      setOrderCount((prev) => prev - 1);
    }
  };

  const increaseOrderNumber = () => {
    setOrderCount((prev) => prev + 1);
  };

  return (
    <div className='order-number-button-container'>
      <div className='order-number-button'>
        <div className='button-container'>
          <BiMinus className='button' onClick={decreaseOrderNumber} />
        </div>
        <div className='number'>{orderCount}</div>
        <div className='button-container'>
          <BiPlus className='button' onClick={increaseOrderNumber} />
        </div>
      </div>
    </div>
  );
}

const CATEGORY_NAME = ['식사', '술', '음료', '기타'];

function IngredientItem(props) {
  const ingredient = props.ingredient;
  const categoryName = CATEGORY_NAME[ingredient.categoryId - 1];

  const [orderCount, setOrderCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(orderCount * ingredient.ingredientPrice);
    props.setTotalOrderPrice((prev) => prev + totalPrice);
  }, [orderCount, totalPrice]);

  return (
    <tr>
      <td>{ingredient.ingredientName}</td>
      <td>{categoryName}</td>
      <td>{ingredient.ingredientPrice}원</td>
      <td>
        <OrderNumberButton
          setOrderCount={setOrderCount}
          orderCount={orderCount}
        />
      </td>
      <td>{totalPrice}원</td>
    </tr>
  );
}

function IngredientOrder() {
  const [ingredientList, setIngredientList] = useState([]);
  const [totalOrderPrice, setTotalOrderPrice] = useState(0);

  const getIngredientList = async () => {
    try {
      const url = `ingredients/items`;
      const response = await axios.get(url);
      setIngredientList(response.data.items);
      console.log(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getIngredientList();
  }, [totalOrderPrice]);

  return (
    <div className='nexttonav'>
      <div className='ingredientorder-container'>
        <div className='title-container'>
          <div className='title-main'>발주관리</div>
          <div className='title-detail'>
            발주를 신청하면 화요일과 목요일에 입고됩니다.
          </div>
        </div>
        <div className='content-container'>
          <div className='table-container'>
            <table>
              <thead>
                <tr>
                  <th>상품명</th>
                  <th>카테고리</th>
                  <th>단가</th>
                  <th>수량</th>
                  <th>총금액</th>
                </tr>
              </thead>
              <tbody>
                {ingredientList.map((ingredient) => {
                  return (
                    <IngredientItem
                      key={ingredient.ingredientId}
                      ingredient={ingredient}
                      setTotalOrderPrice={setTotalOrderPrice}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className='bottom-container'>
            <div className='total-order-price'>
              <span className='hangeul-text'>총 발주 금액</span>
              <span className='number'>{totalOrderPrice} 원</span>
            </div>
            <div className='order-button-container'>
              <div className='order-button'>
                <div className='button-title'>발주하기</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IngredientOrder;
