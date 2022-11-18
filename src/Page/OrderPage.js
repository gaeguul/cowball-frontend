import React, { useState, useEffect } from 'react';
import CustomerLayout from '../Component/CustomerLayout';
import Header from '../Component/Header';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../scss/OrderPage.scss';

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

function TopInfoComponent(props) {
  return (
    <div className='top-info-container'>
      <div className='img-container'>
        <img className='steak-image' alt='steak-image' src='/img/steak2.png' />
      </div>
      <div className='right-info-container'>
        <div className='dinner-title-ko'>{props.dinnerInfo.dinnerName}</div>
        <div className='dinner-title-en'>Valentine Dinner</div>
        <div className='dinner-detail'>{props.dinnerInfo.dinnerDetail}</div>
        <div className='dinner-price-title'>
          <span className='dinner-price'>{props.dinnerInfo.dinnerPrice}</span>
          <span>원</span>
        </div>
      </div>
    </div>
  );
}

function SteakDegreeComponent() {
  return (
    <div className='steak-degree-container'>
      <div className='title-container'>
        <div className='main-title'>스테이크 굽기 단계</div>
        <div className='sub-title'>스테이크 굽기 단계를 선택해주세요.</div>
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
  );
}

function ExtraOptionComponent(props) {
  // console.log(props.extraOption);
  return (
    <>
      <div className='dinner-option-name'>
        {props.extraOption.dinnerOptionDetail}
      </div>
      <div className='dinner-option-price'>
        {props.extraOption.dinnerOptionPrice}원
      </div>
      <div className='dinner-option-button'>
        <ChangeOptionNumberButton />
      </div>
    </>
  );
}

function OrderPage() {
  const { dinnerId } = useParams();

  const [dinnerInfo, setDinnerInfo] = useState({});
  const [styleOptions, setStyleOptions] = useState([]);

  const [options, setOptions] = useState([]);
  const [mainOptions, setMainOptions] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);

  /** 무한렌더링 방지하고,
   * API 호출 후 변수 세팅까지 완료한 후에
   * 다시 한번더 렌더링하기 위해 loading 변수 추가함
   */
  const [loading, setLoading] = useState(true);

  /** 선택한 디너 정보 API 호출 */
  const getDinnerInfo = async () => {
    try {
      const url = `menu/dinners/${dinnerId}`;
      const response = await axios.get(url);
      setDinnerInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  /** 스타일 API 호출 */
  const getStyleOptions = async () => {
    try {
      const url = `menu/styles`;
      const response = await axios.get(url);

      setStyleOptions(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  /** 선택한 디너 옵션 정보 호출 */
  const getOptions = async () => {
    try {
      // setLoading(true);
      const url = `menu/dinners/${dinnerId}/options`;
      const response = await axios.get(url);
      setOptions(response.data);

      const mainOptionList = options.filter(
        (option) => option.dinnerOptionName === '메인메뉴 삭제',
      );
      const extraOptionList = options.filter(
        (option) => option.dinnerOptionName === '추가 구성품',
      );

      setMainOptions(mainOptionList);
      setExtraOptions(extraOptionList);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDinnerInfo();
    getStyleOptions();
  }, []);

  useEffect(() => {
    getOptions();
  }, [loading]);

  return (
    <CustomerLayout>
      <Header />
      <div className='order-container'>
        <TopInfoComponent dinnerInfo={dinnerInfo} />
        <div className='bottom-info-container'>
          <div className='bottom-left-container'>
            <div className='menu-item-container'>
              <div className='title-container'>
                <div className='main-title'>메뉴 구성</div>
                <div className='sub-title'>
                  구성 메뉴 삭제는 스테이크를 제외한 메뉴 중 한 가지만
                  가능합니다.
                </div>
              </div>
              <div className='radio-container'>
                {mainOptions.map((mainOption) => {
                  return (
                    <label key={mainOption.dinnerOptionId}>
                      <input
                        type='radio'
                        name='delete-menu'
                        id={mainOption.dinnerOptionId}
                        value={mainOption.dinnerOptionId}
                      />
                      {mainOption.dinnerOptionDetail}
                      <span className='option-price'>
                        ({mainOption.dinnerOptionPrice}원)
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
            <SteakDegreeComponent />
            <div className='select-style-container'>
              <div className='title-container'>
                <div className='main-title'>스타일 선택</div>
                <div className='sub-title'>
                  심플 스타일: 상자 접시/일반 냅킨/플라스틱 쟁반<br></br>그랜드
                  스타일: 도자기 접시/플라스틱 컵/흰색 면 냅킨/나무 쟁반
                  <br></br>
                  디럭스 스타일: 은 쟁반/작은 꽃병/도자기 접시/린넨 냅킨
                </div>
                <div className='radio-container'>
                  {styleOptions.map((option) => {
                    return (
                      <label key={option.styleId}>
                        <input
                          type='radio'
                          name='style'
                          id={option.styleId}
                          value={option.styleId}
                        />
                        {option.styleName} 스타일
                        <span className='option-price'>
                          (+{option.stylePrice}원)
                        </span>
                      </label>
                    );
                  })}
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
                {loading ? (
                  <div className='loading'></div>
                ) : (
                  <>
                    {extraOptions.map((extraOption) => {
                      return (
                        <ExtraOptionComponent
                          key={extraOption.dinnerOptionId}
                          extraOption={extraOption}
                        />
                      );
                    })}
                  </>
                )}
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
    </CustomerLayout>
  );
}

export default OrderPage;
