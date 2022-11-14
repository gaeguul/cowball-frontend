import React, { useState, useEffect } from 'react';
import CustomerLayout from '../Component/CustomerLayout';
import Header from '../Component/Header';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../scss/OrderPage.scss';

// import { useForm } from 'react-hook-form';

function ChangeDinnerNumberButton() {
  const [dinnerNumber, setDinnerNumber] = useState(0);

  const decreaseDinnerNumber = () => {
    if (dinnerNumber == 0) {
      console.log('더 이상 줄일 수 없습니다');
    } else {
      setDinnerNumber(dinnerNumber - 1);
    }
  };

  const increaseDinnerNumber = () => {
    setDinnerNumber(dinnerNumber + 1);
  };

  return (
    <div className='dinner-number-button-container'>
      <div className='dinner-number-button'>
        <div className='button-container'>
          <BiMinus className='button' onClick={decreaseDinnerNumber} />
        </div>
        <div className='number'>{dinnerNumber}</div>
        <div className='button-container'>
          <BiPlus className='button' onClick={increaseDinnerNumber} />
        </div>
      </div>
    </div>
  );
}

function ChangeOptionNumberButton() {
  const [optionNumber, setOptionNumber] = useState(0);

  const decreaseOptionNumber = () => {
    if (optionNumber == 0) {
      console.log('더 이상 줄일 수 없습니다');
    } else {
      setOptionNumber(optionNumber - 1);
    }
  };

  const increaseOptiomNumber = () => {
    setOptionNumber(optionNumber + 1);
  };

  return (
    <div className='option-number-button-container'>
      <div className='option-number-button'>
        <div className='button-container'>
          <BiMinus className='button' onClick={decreaseOptionNumber} />
        </div>
        <div className='number'>{optionNumber}</div>
        <div className='button-container'>
          <BiPlus className='button' onClick={increaseOptiomNumber} />
        </div>
      </div>
    </div>
  );
}

function OrderContainer() {
  return (
    <div className='order-container'>
      <div className='top-info-container'>
        <div className='img-container'>
          <img
            className='steak-image'
            alt='steak-image'
            src='/img/steak2.png'
          />
        </div>
        <div className='right-info-container'>
          <div className='dinner-title-ko'>발렌타인 디너</div>
          <div className='dinner-title-en'>Valentine Dinner</div>
          <div className='dinner-detail'>
            압도적인 크기와 풍미가 가득한 토마호크 스테이크와 셰프 가니시의 만남
          </div>
          <div className='dinner-price-title'>
            <span className='dinner-price'>108,000</span>
            <span>원</span>
          </div>
        </div>
      </div>
      <div className='bottom-info-container'>
        <div className='bottom-left-container'>
          <div className='menu-item-container'>
            <div className='title-container'>
              <div className='main-title'>메뉴 구성</div>
              <div className='sub-title'>
                구성 메뉴 삭제는 스테이크를 제외한 메뉴 중 한 가지만 가능합니다.
              </div>
            </div>
            <div className='radio-container'>
              <label>
                <input type='radio' name='delete-menu' id='1' value='1' />
                와인 1잔
              </label>
              <label>
                <input type='radio' name='delete-menu' id='2' value='2' />
                하트모양과 큐피드 접시
              </label>
              <label>
                <input type='radio' name='delete-menu' id='3' value='3' />
                냅킨
              </label>
            </div>
          </div>
          <div className='steak-degree-container'>
            <div className='title-container'>
              <div className='main-title'>스테이크 굽기 단계</div>
              <div className='sub-title'>
                스테이크 굽기 단계를 선택해주세요.
              </div>
            </div>
            <div className='radio-container'>
              <label>
                <input type='radio' name='steak-degree' id='1' value='1' />
                레어
              </label>
              <label>
                <input type='radio' name='steak-degree' id='2' value='2' />
                미디움레어
              </label>
              <label>
                <input type='radio' name='steak-degree' id='3' value='3' />
                미디움
              </label>
              <label>
                <input type='radio' name='steak-degree' id='4' value='4' />
                미디움웰
              </label>
              <label>
                <input type='radio' name='steak-degree' id='5' value='5' />
                웰던
              </label>
            </div>
          </div>
          <div className='select-style-container'>
            <div className='title-container'>
              <div className='main-title'>스타일 선택</div>
              <div className='sub-title'>
                심플 스타일은 상자 접시/일반 냅킨/플라스틱 쟁반, 그랜드 스타일은
                도자기 접시/플라스틱 컵/흰색 면 냅킨/나무 쟁반, 디럭스 스타일은
                은 쟁반/작은 꽃병/도자기 접시/린넨 냅킨으로 구성되어 있습니다.
              </div>
              <div className='radio-container'>
                <label>
                  <input type='radio' name='style' id='1' value='1' />
                  심플 스타일
                </label>
                <label>
                  <input type='radio' name='style' id='2' value='2' />
                  그랜드 스타일
                </label>
                <label>
                  <input type='radio' name='style' id='3' value='3' />
                  디럭스 스타일
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className='bottom-right-container'>
          <div className='title-container'>
            <div className='main-title'>추가할 디너 옵션</div>
          </div>
          <div className='dinner-option-list'>
            <div className='dinner-option-container'>
              <div className='dinner-option-name'>스테이크 레어 1인분</div>
              <div className='dinner-option-price'>10,000</div>
              <div className='dinner-option-button'>
                <ChangeOptionNumberButton />
              </div>
              <div className='dinner-option-name'>
                스테이크 미디움레어 1인분
              </div>
              <div className='dinner-option-price'>10,000</div>
              <div className='dinner-option-button'>
                <ChangeOptionNumberButton />
              </div>
              <div className='dinner-option-name'>에그스크램블 1인분</div>
              <div className='dinner-option-price'>3,000</div>
              <div className='dinner-option-button'>
                <ChangeOptionNumberButton />
              </div>
            </div>
          </div>
          <div className='dinner-number-and-price-container'>
            <div className='dinner-number-title title'>디너 수량</div>
            <div className='dinner-number-button content'>
              <ChangeDinnerNumberButton />
            </div>
            <div className='total-price-title title'>총 가격</div>
            <div className='total-price-number content'>240,000원</div>
          </div>
          <div className='put-dinner-cart-button-container'>
            <button className='put-dinner-cart-button' type='submit'>
              장바구니에 담기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderPage() {
  const { dinnerId } = useParams();
  console.log(dinnerId);

  // const { mainOptions, setMainOptions } = useState([]);
  // const { extraOptions, setExtraOptions } = useState([]);

  useEffect(() => {
    const getDinnerIngredient = async () => {
      try {
        const url = `http://ec2-3-39-248-238.ap-northeast-2.compute.amazonaws.com:8080/api/v1/menu/dinners/${dinnerId}/options`;
        const response = await axios.get(url);
        console.log(response.data);

        {
          response.data.map((option) => {
            console.log(option.dinnerOptionName);
          });
        }
        // setDinners(response.data.items);
      } catch (error) {
        console.log(error);
      }
    };
    getDinnerIngredient();
  }, []);

  return (
    <CustomerLayout>
      <Header />
      <OrderContainer />
    </CustomerLayout>
  );
}

export default OrderPage;
