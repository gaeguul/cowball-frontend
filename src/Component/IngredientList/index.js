import React from 'react';
import { BiPlus, BiMinus } from 'react-icons/bi';

function ArrivedNumberButton({ number }) {
  return (
    <div className='arrived-number-button-container'>
      <div className='arrived-number-button'>
        <div className='button-container'>
          <BiMinus className='button' />
        </div>
        <div className='number'>{number}</div>
        <div className='button-container'>
          <BiPlus className='button' />
        </div>
      </div>
    </div>
  );
}

function IngredientList() {
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
              <th>상품명</th>
              <th>카테고리</th>
              <th>전일재고</th>
              <th>당일입고</th>
              <th>당일출고</th>
              <th>현재재고</th>
            </thead>
            <tbody>
              <tr>
                <td>스테이크</td>
                <td>식사</td>
                <td>10</td>
                <td>50</td>
                <td>30</td>
                <td>30</td>
              </tr>
              <tr>
                <td>샐러드</td>
                <td>식사</td>
                <td>10</td>
                <td>50</td>
                <td>30</td>
                <td>30</td>
              </tr>
              <tr>
                <td>에그스크램블</td>
                <td>식사</td>
                <td>10</td>
                <td>100</td>
                <td>30</td>
                <td>30</td>
              </tr>
              <tr>
                <td>와인</td>
                <td>술</td>
                <td>10</td>
                <td>
                  <ArrivedNumberButton number={40} />
                </td>
                <td>30</td>
                <td>30</td>
              </tr>
              <tr>
                <td>샴페인</td>
                <td>술</td>
                <td>10</td>
                <td>
                  <ArrivedNumberButton number={10} />
                </td>
                <td>30</td>
                <td>30</td>
              </tr>
              <tr>
                <td>베이컨</td>
                <td>식사</td>
                <td>10</td>
                <td>50</td>
                <td>30</td>
                <td>30</td>
              </tr>
              <tr>
                <td>베이컨</td>
                <td>식사</td>
                <td>10</td>
                <td>50</td>
                <td>30</td>
                <td>30</td>
              </tr>
              <tr>
                <td>베이컨</td>
                <td>식사</td>
                <td>10</td>
                <td>50</td>
                <td>30</td>
                <td>30</td>
              </tr>
              <tr>
                <td>베이컨</td>
                <td>식사</td>
                <td>10</td>
                <td>50</td>
                <td>30</td>
                <td>30</td>
              </tr>
              <tr>
                <td>베이컨</td>
                <td>식사</td>
                <td>10</td>
                <td>50</td>
                <td>30</td>
                <td>30</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default IngredientList;
