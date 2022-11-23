import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { API, LoadingPlaceholder } from '../IngredientCommon';

const YOIL = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
];
const deliveryYoil = [1, 4]; //월 목

function OrderNumberButton({ orderCount, onValueChange }) {
  const [value, setValue] = useState(orderCount);

  const decreaseOrderNumber = () => {
    if (value === 0) console.log('더 이상 줄일 수 없습니다');
    else setValue(value - 1);
  };

  const increaseOrderNumber = () => {
    setValue(value + 1);
  };

  useEffect(() => {
    onValueChange(value);
  }, [value]);

  return (
    <div className='order-number-button-container'>
      <div className='order-number-button'>
        <div className='button-container'>
          <BiMinus className='button' onClick={decreaseOrderNumber} />
        </div>
        {/*<div className='number'>{orderCount}</div>*/}
        <input
          className='number'
          type='number'
          min={0}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
        <div className='button-container'>
          <BiPlus className='button' onClick={increaseOrderNumber} />
        </div>
      </div>
    </div>
  );
}

function IngredientItem({ ingredient, amount, category, onAmountChange }) {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(amount * ingredient.ingredientPrice);
  }, []);

  const onValueChange = (value) => {
    setTotalPrice(value * ingredient.ingredientPrice);
    onAmountChange(value, totalPrice);
  };

  return (
    <tr>
      <td>{ingredient.ingredientName}</td>
      <td>{category.categoryName}</td>
      <td>{ingredient.ingredientPrice.toLocaleString('ko-kr')}원</td>
      <td>
        <OrderNumberButton orderCount={amount} onValueChange={onValueChange} />
      </td>
      <td>{totalPrice.toLocaleString('ko-kr')}원</td>
    </tr>
  );
}

function IngredientOrder() {
  const [ingredientList, setIngredientList] = useState([]);
  const [ingredientOrders, setIngredientOrders] = useState([]);
  const [ingredientCategories, setIngredientCategories] = useState([]);

  const [requests, setRequests] = useState([]);

  const [totalOrderPrice, setTotalOrderPrice] = useState(0);
  const calculateTotalOrderPrice = (ings, orders) => {
    let price = 0;
    console.log('Orders', orders);
    orders.forEach((order) => {
      const ingredient = ings.find(
        (ing) => order.ingredientId === ing.ingredientId,
      );
      if (!ingredient) return null;
      const ingredientPrice = ingredient.ingredientPrice;
      price += order.orderAmount * ingredientPrice;
    });
    return price;
  };

  const [loading, setLoading] = useState(true);

  const putRequest = (ingredientId, amount) => {
    console.log('Put Request: ', ingredientId, amount);

    const existingIndex = requests.findIndex(
      (value) => value.ingredientId === ingredientId,
    );

    if (existingIndex === -1) {
      requests.push({ ingredientId: ingredientId, amount: amount });
      setRequests(requests);
    } else {
      requests[existingIndex].amount = amount;
      setRequests(requests);
    }

    console.log(requests);
  };

  const handleOrderButtonClick = async () =>
    await axios
      .put(`ingredients/orders`, requests)
      .then((res) => {
        if (res.status < 400) alert('발주 내용을 전송했습니다.');
        else throw new Error('잘못된 요청입니다.');
      })
      .catch((e) => console.log(e));

  useEffect(() => {
    Promise.all([
      API.getIngredientCategories().then(setIngredientCategories),
      API.getIngredientList()
        .then(setIngredientList)
        .finally(() => setLoading(false)),
      API.getTodayIngredientSchedule()
        .then((items) =>
          items.map((item) => {
            return {
              ingredientId: item.ingredientId,
              orderAmount: item.orderAmount,
            };
          }),
        )
        .then(setIngredientOrders),
    ]).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const price = calculateTotalOrderPrice(ingredientList, ingredientOrders);
    setTotalOrderPrice(price);
  }, [ingredientOrders, ingredientList]);

  if (loading) return <LoadingPlaceholder />;

  return (
    <div className='nexttonav'>
      <div className='ingredientorder-container'>
        <div className='title-container'>
          <div className='title-main'>발주관리</div>
          <div className='title-detail'>
            발주를 신청하면 {deliveryYoil.map((yoil) => YOIL[yoil]).join(', ')}
            에 입고됩니다.
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
                  const ingOrder = ingredientOrders.find(
                    (value) => value.ingredientId === ingredient.ingredientId,
                  );
                  const orderAmount = ingOrder ? ingOrder.orderAmount : 0;

                  const onAmountChange = (value, prevPrice) => {
                    const newPrice = value * ingredient.ingredientPrice;
                    const diff = newPrice - prevPrice;
                    setTotalOrderPrice(totalOrderPrice + diff);

                    putRequest(ingredient.ingredientId, value);
                  };

                  return (
                    <IngredientItem
                      key={ingredient.ingredientId}
                      ingredient={ingredient}
                      category={ingredientCategories.find(
                        (value) => value.categoryId === ingredient.categoryId,
                      )}
                      amount={orderAmount}
                      onAmountChange={onAmountChange}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className='bottom-container'>
            <div className='total-order-price'>
              <span className='hangeul-text'>총 발주 금액</span>
              <span className='number'>
                {totalOrderPrice.toLocaleString('ko-kr')} 원
              </span>
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
