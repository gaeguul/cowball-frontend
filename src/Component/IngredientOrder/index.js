import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiPlus, BiMinus } from 'react-icons/bi';

const CATEGORY_NAME = ['식사', '술', '음료', '기타'];

function OrderNumberButton(props) {
  const orderCount = props.orderCount;
  const setOrderCount = props.setOrderCount;

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

function IngredientItem(props) {
  const ingredient = props.ingredient;
  const setTotalOrderPrice = props.setTotalOrderPrice;
  const setNewIngredientOrder = props.setNewIngredientOrder;
  const ingredientId = ingredient.ingredientId;
  const categoryName = CATEGORY_NAME[ingredient.categoryId - 1];

  const [orderCount, setOrderCount] = useState(0); //OrderNumberButton에 의해 변경됨
  const [totalPrice, setTotalPrice] = useState(0); //해당 ingredient의 orderCount에 따른 총 가격

  const getOrderCount = async () => {
    try {
      const url = `ingredients/orders`;
      const response = await axios.get(url);
      const tmpItems = response.data.items;
      const tmpItem = tmpItems.find((item) => {
        return item.ingredientId === ingredientId;
      });

      if (tmpItem) {
        const tmpNumber = tmpItem.orderedNumber;
        setOrderCount(tmpNumber);
      } else {
        setOrderCount(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderCount();
  }, []);

  useEffect(() => {
    setTotalPrice(orderCount * ingredient.ingredientPrice);
    setTotalOrderPrice((prev) => prev + ingredient.ingredientPrice);

    const newIngredientOrder = {
      ingredientId: ingredientId,
      amount: orderCount,
    };
    setNewIngredientOrder(newIngredientOrder);
  }, [orderCount]);

  return (
    <tr>
      <td>{ingredient.ingredientName}</td>
      <td>{categoryName}</td>
      <td>{ingredient.ingredientPrice}원</td>
      <td>
        <OrderNumberButton
          orderCount={orderCount}
          setOrderCount={setOrderCount}
        />
      </td>
      <td>{totalPrice}원</td>
    </tr>
  );
}

function IngredientOrder() {
  const [ingredientList, setIngredientList] = useState([]);
  const [totalOrderPrice, setTotalOrderPrice] = useState(0);
  const [newIngredientOrder, setNewIngredientOrder] = useState({});
  const [ingredientOrderList, setIngredientOrderList] = useState([]);

  const getIngredientList = async () => {
    try {
      const url = `ingredients/items`;
      const response = await axios.get(url);
      setIngredientList(response.data.items);
      // console.log(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const makeIngredientOrderList = () => {
    const IsExit = ingredientOrderList.find(
      (ingredient) =>
        ingredient.ingredientId === newIngredientOrder.ingredientId,
    );
    if (!IsExit) {
      //리스트에 없는 경우
      const newIngredientOrderList = [
        ...ingredientOrderList,
        newIngredientOrder,
      ];
      setIngredientOrderList(newIngredientOrderList);
      console.log(newIngredientOrderList);
    } else {
      //리스트에 있는 경우
      const newIngredientOrderList = ingredientOrderList.map((i) =>
        i.ingredientId == newIngredientOrder.ingredientId
          ? { ...i, amount: newIngredientOrder.amount }
          : i,
      );
      setIngredientOrderList(newIngredientOrderList);
      console.log(newIngredientOrderList);
    }
  };

  const handleOrderButtonClick = async () => {
    try {
      /** ingredientOrderList의 [0], [1]항에 알 수 없는 게 들어가있어서 자름*/
      const data = ingredientOrderList.slice(2);
      console.log('data', data);
      const url = `ingredients/orders`;
      const response = await axios.put(url, data);
      console.log('[handleOrderButtonClick] ', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getIngredientList();
  }, []);

  useEffect(() => {
    makeIngredientOrderList();
  }, [newIngredientOrder]);

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
                      setNewIngredientOrder={setNewIngredientOrder}
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
              <div className='order-button' onClick={handleOrderButtonClick}>
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
