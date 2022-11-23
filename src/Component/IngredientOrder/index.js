import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { API, LoadingPlaceholder } from '../IngredientCommon';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const YOIL = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
];

function usePrevState(state) {
  const ref = useRef();
  useEffect(() => {
    ref.current = state;
  });
  return ref.current;
}

function OrderNumberButton({ orderCount, onValueChange }) {
  const [value, setValue] = useState(orderCount);
  const prevValue = usePrevState(value);

  const decreaseOrderNumber = () => {
    if (value === 0) console.log('더 이상 줄일 수 없습니다');
    else setValue((prev) => prev - 1);
  };

  const increaseOrderNumber = () => {
    setValue((prev) => prev + 1);
  };

  useEffect(() => {
    onValueChange(value, prevValue);
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

  const onValueChange = (newValue, oldValue) => {
    setTotalPrice(newValue * ingredient.ingredientPrice);
    onAmountChange(newValue, oldValue);
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

  const [deliveredDays, setDeliveredDays] = useState([]);
  const [orderDate, setOrderDate] = useState();

  useEffect(() => {
    Promise.all([
      axios
        .get(`ingredients/orders/delivered-day`)
        .then((res) => res.data)
        .then(setDeliveredDays),
      API.getIngredientCategories().then(setIngredientCategories),
      API.getIngredientList()
        .then(setIngredientList)
        .finally(() => setLoading(false)),
      API.getIngredientOrders().then((data) => {
        setOrderDate(new Date(data.date));
        setIngredientOrders(data.items);
        console.log('Orders Data', data);
      }),
    ])
      .finally(() => setLoading(false))
      .finally(() => console.log('orders', ingredientOrders));
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
            발주를 신청하면{' '}
            {deliveredDays
              .map((bo, i) => (bo ? YOIL[i] : null))
              .filter((day) => day !== null)
              .join(', ')}
            에 입고됩니다.
            <br />
            (당일 제외)
          </div>
        </div>
        <div className='content-container'>
          <div className='delivered-date-info'>
            아래의 목록은{' '}
            <strong>{format(orderDate, 'PPP (E)', { locale: ko })}</strong>에
            도착할 주문에 대한 명세입니다.
          </div>
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

                  const onAmountChange = (newValue, oldValue) => {
                    const diff = newValue - oldValue;
                    if (diff === 0) return;

                    setTotalOrderPrice(
                      totalOrderPrice + diff * ingredient.ingredientPrice,
                    );

                    putRequest(ingredient.ingredientId, newValue);
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
