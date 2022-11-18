import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiPlus, BiMinus } from 'react-icons/bi';

const CATEGORY_NAME = ['식사', '술', '음료', '기타'];

function ArrivedNumberButton(props) {
  const ingredientId = props.ingredientId;
  const [todayArrivedCount, setTodayArrivedCount] = useState(0);

  /** 버튼 눌러서 'todayArrivedCount' 변경시키면 실행됨 */
  const putTodayArrivedIngredient = async () => {
    try {
      const url = `ingredients/stocks`;
      const data = { ingredientId: ingredientId, amount: todayArrivedCount };
      const response = await axios.put(url, data);
      console.log('[putTodayArrivedIngredient] ', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseArrivedNumber = () => {
    if (todayArrivedCount == 0) {
      console.log('더 이상 줄일 수 없습니다');
    } else {
      setTodayArrivedCount((prev) => prev - 1);
      putTodayArrivedIngredient();
    }
  };

  const increaseArrivedNumber = () => {
    setTodayArrivedCount((prev) => prev + 1);
    putTodayArrivedIngredient();
  };

  const getTodayArrivedIngredient = async () => {
    try {
      const url = `ingredients/items`;

      const response = await axios.get(url);
      const tmpCount = response.data.items[ingredientId - 1].todayArrived;
      setTodayArrivedCount(tmpCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodayArrivedIngredient();
  }, []);

  // useEffect(() => {
  //   putTodayArrivedIngredient();
  // }, [decreaseArrivedNumber, increaseArrivedNumber]);

  return (
    <div className='arrived-number-button-container'>
      <div className='arrived-number-button'>
        <div className='button-container'>
          <BiMinus className='button' onClick={decreaseArrivedNumber} />
        </div>
        <div className='number'>{todayArrivedCount}</div>
        <div className='button-container'>
          <BiPlus className='button' onClick={increaseArrivedNumber} />
        </div>
      </div>
    </div>
  );
}

function IngredientItem(props) {
  const ingredient = props.ingredient;
  const categoryName = CATEGORY_NAME[ingredient.categoryId - 1];
  const IsAlcohol = ingredient.categoryId === 2 ? true : false;

  // const [todayArrivedCount, setTodayArrivedCount] = useState(0);

  // useEffect(() => {
  //   console.log('todayArrivedCount', todayArrivedCount);
  // }, [todayArrivedCount]);

  return (
    <tr>
      <td>{ingredient.ingredientName}</td>
      <td>{categoryName}</td>
      <td>{ingredient.prevStock}</td>
      <td>
        {IsAlcohol ? (
          <ArrivedNumberButton
            ingredientId={ingredient.ingredientId}
            // todayArrivedCount={todayArrivedCount}
            // setTodayArrivedCount={setTodayArrivedCount}
          />
        ) : (
          ingredient.todayArrived
        )}
      </td>
      <td>{ingredient.todayOut}</td>
      <td>{ingredient.currentStock}</td>
    </tr>
  );
}

function IngredientList() {
  const [ingredientList, setIngredientList] = useState([]);

  const getIngredientList = async () => {
    try {
      const url = `ingredients/items`;
      const response = await axios.get(url);
      setIngredientList(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getIngredientList();
  }, []);

  return (
    <div className='nexttonav'>
      <div className='ingredientlist-container'>
        <div className='title-container'>
          <div className='title-main'>재고현황</div>
          <div className='title-detail'>
            어제 재고현황과 오늘 재고현황을 보여줍니다.<br></br>술 상품은
            상점에서 구매한 수량만큼 당일입고 수량을 직접 변경할 수 있습니다.
          </div>
        </div>
        <div className='content-container'>
          <table>
            <thead>
              <tr>
                <th>상품명</th>
                <th>카테고리</th>
                <th>전일재고</th>
                <th>당일입고</th>
                <th>당일출고</th>
                <th>현재재고</th>
              </tr>
            </thead>
            <tbody>
              {ingredientList.map((ingredient) => {
                return (
                  <IngredientItem
                    key={ingredient.ingredientId}
                    ingredient={ingredient}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default IngredientList;
