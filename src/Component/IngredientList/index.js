import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiPlus, BiMinus } from 'react-icons/bi';

const CATEGORY_NAME = ['식사', '술', '음료', '기타'];

function ArrivedNumberButton() {
  /**
   * 수량 개수 변화시켜서 post하기
   */
  const [arrivedNumber, setArrivedNumber] = useState(0);

  const decreaseArrivedNumber = () => {
    if (arrivedNumber == 0) {
      alert('더 이상 줄일 수 없습니다');
    } else {
      setArrivedNumber(arrivedNumber - 1);
    }
  };

  const increaseArrivedNumber = () => {
    setArrivedNumber(arrivedNumber + 1);
  };

  useEffect(() => {
    console.log('arrived number:', arrivedNumber);
  }, [arrivedNumber]);

  return (
    <div className='arrived-number-button-container'>
      <div className='arrived-number-button'>
        <div className='button-container'>
          <BiMinus className='button' onClick={decreaseArrivedNumber} />
        </div>
        <div className='number'>{arrivedNumber}</div>
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

  return (
    <tr>
      <td>{ingredient.ingredientName}</td>
      <td>{categoryName}</td>
      <td>{ingredient.prevStock}</td>
      <td>
        <ArrivedNumberButton ingredientId={ingredient.ingredientId} />
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
              <tr>
                <td>샴페인</td>
                <td>술</td>
                <td>10</td>
                <td>
                  <ArrivedNumberButton />
                </td>
                <td>30</td>
                <td>30</td>
              </tr>
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
