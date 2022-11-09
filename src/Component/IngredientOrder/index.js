import React from 'react';
import OrderNumberButton from './OrderNumberButton';

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
                <tr>
                  <td>스테이크</td>
                  <td>식사</td>
                  <td>20,000원</td>
                  <td>
                    <OrderNumberButton />
                  </td>
                  <td>1,000,000원</td>
                </tr>
                <tr>
                  <td>스테이크</td>
                  <td>식사</td>
                  <td>20,000원</td>
                  <td>
                    <OrderNumberButton />
                  </td>
                  <td>1,000,000원</td>
                </tr>
                <tr>
                  <td>스테이크</td>
                  <td>식사</td>
                  <td>20,000원</td>
                  <td>
                    <OrderNumberButton />
                  </td>
                  <td>1,000,000원</td>
                </tr>
                <tr>
                  <td>스테이크</td>
                  <td>식사</td>
                  <td>20,000원</td>
                  <td>
                    <OrderNumberButton />
                  </td>
                  <td>1,000,000원</td>
                </tr>
                <tr>
                  <td>스테이크</td>
                  <td>식사</td>
                  <td>20,000원</td>
                  <td>
                    <OrderNumberButton />
                  </td>
                  <td>1,000,000원</td>
                </tr>
                <tr>
                  <td>스테이크</td>
                  <td>식사</td>
                  <td>20,000원</td>
                  <td>
                    <OrderNumberButton />
                  </td>
                  <td>1,000,000원</td>
                </tr>
                <tr>
                  <td>스테이크</td>
                  <td>식사</td>
                  <td>20,000원</td>
                  <td>
                    <OrderNumberButton />
                  </td>
                  <td>1,000,000원</td>
                </tr>
                <tr>
                  <td>스테이크</td>
                  <td>식사</td>
                  <td>20,000원</td>
                  <td>
                    <OrderNumberButton />
                  </td>
                  <td>1,000,000원</td>
                </tr>
                <tr>
                  <td>스테이크</td>
                  <td>식사</td>
                  <td>20,000원</td>
                  <td>
                    <OrderNumberButton />
                  </td>
                  <td>1,000,000원</td>
                </tr>
                <tr>
                  <td>스테이크</td>
                  <td>식사</td>
                  <td>20,000원</td>
                  <td>
                    <OrderNumberButton />
                  </td>
                  <td>1,000,000원</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='bottom-container'>
            <div className='total-order-price'>
              <span className='hangeul-text'>총 발주 금액</span>
              <span className='number'>1,000,000원</span>
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
