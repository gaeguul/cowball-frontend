import React, { useState, useEffect } from 'react';
import CustomerLayout from '../Component/CustomerLayout';
import Header from '../Component/Header';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../scss/OrderPage.scss';

const MY_ORDER = {
  degreeId: 0,
  dinnerId: 0,
  styleId: 0,
  dinnerOptionIds: [],
  dinnerAmount: 1,
};

function ChangeDinnerNumberButton(props) {
  // const [dinnerNumber, setDinnerNumber] = useState(0);

  const myDinnerNumber = props.myDinnerNumber;
  const setMyDinnerNumber = props.setMyDinnerNumber;

  const decreaseDinnerNumber = () => {
    if (myDinnerNumber == 0) {
      console.log('더 이상 줄일 수 없습니다');
    } else {
      setMyDinnerNumber((prev) => prev - 1);
    }
  };

  const increaseDinnerNumber = () => {
    setMyDinnerNumber((prev) => prev + 1);
  };

  return (
    <div className='dinner-number-button-container'>
      <div className='dinner-number-button'>
        <div className='button-container'>
          <BiMinus className='button' onClick={decreaseDinnerNumber} />
        </div>
        <div className='number'>{myDinnerNumber}</div>
        <div className='button-container'>
          <BiPlus className='button' onClick={increaseDinnerNumber} />
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

function SteakDegreeComponent(props) {
  const setMySteakDegree = props.setMySteakDegree;

  const handleDegreeButtonClick = (event) => {
    setMySteakDegree(parseInt(event.target.id));
  };

  return (
    <div className='steak-degree-container'>
      <div className='title-container'>
        <div className='main-title'>스테이크 굽기 단계</div>
        <div className='sub-title'>스테이크 굽기 단계를 선택해주세요.</div>
      </div>
      <div className='radio-container' onChange={handleDegreeButtonClick}>
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

function StyleComponent(props) {
  const styleOptions = props.styleOptions;
  const setMyStyleId = props.setMyStyleId;
  const handleStyleButtonClick = (event) => {
    setMyStyleId(parseInt(event.target.id));
  };
  return (
    <div className='select-style-container'>
      <div className='title-container'>
        <div className='main-title'>스타일 선택</div>
        <div className='sub-title'>
          심플 스타일: 상자 접시/일반 냅킨/플라스틱 쟁반<br></br>그랜드 스타일:
          도자기 접시/플라스틱 컵/흰색 면 냅킨/나무 쟁반
          <br></br>
          디럭스 스타일: 은 쟁반/작은 꽃병/도자기 접시/린넨 냅킨
        </div>
        <div className='radio-container' onChange={handleStyleButtonClick}>
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
                <span className='option-price'>(+{option.stylePrice}원)</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DeleteMainOptionComponent(props) {
  const mainOptions = props.mainOptions;
  const setMyMainOption = props.setMyMainOption;

  const handleMainOptionClick = (event) => {
    console.log('event.target.id', event.target.id);
    setMyMainOption(event.target.id);
  };

  return (
    <div className='menu-item-container'>
      <div className='title-container'>
        <div className='main-title'>메뉴 구성</div>
        <div className='sub-title'>
          구성 메뉴 삭제는 스테이크를 제외한 메뉴 중 한 가지만 가능합니다.
        </div>
      </div>
      <div className='radio-container' onChange={handleMainOptionClick}>
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
  );
}

function ChangeOptionNumberButton(props) {
  const optionNumber = props.optionNumber;
  const setOptionNumber = props.setOptionNumber;

  const decreaseOptionNumber = () => {
    if (optionNumber == 0) {
      console.log('더 이상 줄일 수 없습니다');
    } else {
      setOptionNumber((prev) => prev - 1);
    }
  };

  const increaseOptionNumber = () => {
    setOptionNumber((prev) => prev + 1);
  };

  return (
    <div className='option-number-button-container'>
      <div className='option-number-button'>
        <div className='button-container'>
          <BiMinus className='button' onClick={decreaseOptionNumber} />
        </div>
        <div className='number'>{optionNumber}</div>
        <div className='button-container'>
          <BiPlus className='button' onClick={increaseOptionNumber} />
        </div>
      </div>
    </div>
  );
}

function ExtraOptionItem(props) {
  const extraOption = props.extraOption;
  const setNewExtraOption = props.setNewExtraOption;

  const optionId = extraOption.dinnerOptionId;
  const [optionNumber, setOptionNumber] = useState(0);

  // console.log('optionId', optionId);
  // console.log('optionNumber', optionNumber);

  useEffect(() => {
    const tmpNumber = optionNumber;
    setNewExtraOption([optionId, tmpNumber]);
  }, [optionNumber]);

  return (
    <>
      <div className='dinner-option-name'>
        {props.extraOption.dinnerOptionDetail}
      </div>
      <div className='dinner-option-price'>
        {props.extraOption.dinnerOptionPrice}원
      </div>
      <div className='dinner-option-button'>
        <ChangeOptionNumberButton
          optionNumber={optionNumber}
          setOptionNumber={setOptionNumber}
        />
      </div>
    </>
  );
}

function ExtraOptionComponent(props) {
  const loading = props.loading;
  const extraOptions = props.extraOptions;
  const setMyExtraOptions = props.setMyExtraOptions;

  const [newExtraOption, setNewExtraOption] = useState([]);
  // const [newMapOptions, setNewMapOptions] = useState(new Map());

  const [newMap, setNewMap] = useState(new Map());
  // const tmpMap = new Map();
  // console.log('options', options);

  /**변경한 옵션의 id와 amount로 배열(Map의 항목) 만드는 함수 */
  // const makeOption = (key, value) => {
  //   return [key, value];
  // };

  useEffect(() => {
    const key = newExtraOption[0];
    const value = newExtraOption[1];

    const tmpMap = new Map(newMap).set(key, value);

    setNewMap(tmpMap);
    setMyExtraOptions(tmpMap);
  }, [newExtraOption]);

  return (
    <div className='dinner-option-list'>
      <div className='dinner-option-container'>
        {loading ? (
          <div className='loading'></div>
        ) : (
          <>
            {extraOptions &&
              extraOptions.map((extraOption) => {
                return (
                  <ExtraOptionItem
                    key={extraOption.dinnerOptionId}
                    extraOption={extraOption}
                    setNewExtraOption={setNewExtraOption}
                  />
                );
              })}
          </>
        )}
      </div>
    </div>
  );
}

function OrderPage() {
  const { dinnerId } = useParams();

  const [dinnerInfo, setDinnerInfo] = useState({});
  const [styleOptions, setStyleOptions] = useState([]);

  const [options, setOptions] = useState([]);
  const [mainOptions, setMainOptions] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);

  const [mySteakDegree, setMySteakDegree] = useState(0);
  const [myStyleId, setMyStyleId] = useState(0);
  const [myMainOption, setMyMainOption] = useState(0);
  const [myExtraOptions, setMyExtraOptions] = useState([]);

  /**장바구니 담기 버튼에 의해서만 업데이트 된다 */
  const [myDinnerOptions, setMyDinnerOptions] = useState([]);

  useEffect(() => {
    MY_ORDER['dinnerOptionIds'] = myDinnerOptions;
    console.log('MY_ORDER', MY_ORDER);
  }, [myDinnerOptions]);

  /**주문할 디너 개수 */
  const [myDinnerNumber, setMyDinnerNumber] = useState(1);

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

  /**main과 extra 옵션 합쳐서 하나의 배열로 만들기 */
  const makeDinnerOptions = (mainOption, extraOptions) => {
    const tmpArray = [];

    tmpArray.push({
      id: parseInt(mainOption),
      amount: 1,
    });

    extraOptions.forEach((value, key) => {
      if (key === undefined) return;

      const tmpObject = {
        id: key,
        amount: value,
      };

      tmpArray.push(tmpObject);
    });
    return tmpArray;
  };

  const handlePutCartButtonClick = async () => {
    const myDinnerOptions = makeDinnerOptions(myMainOption, myExtraOptions);
    setMyDinnerOptions(myDinnerOptions);

    /** [POST] 장바구니에 추가 */
    try {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiVVNFUiIsImlkIjoic3RyaW5nIiwiaWF0IjoxNjY4ODQ1NTExLCJleHAiOjE2Njg4NDU1NzF9.RPYIEL-xbHGwW8z_Q3t_RGF-1Cz7rKz7vgql9OlsxT4';
      const userId = 'string';
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = MY_ORDER;
      const url = `cart/${userId}`;
      const response = await axios.post(url, data, options);
      console.log('[handlePutCartButtonClick] ', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDinnerInfo();
    getStyleOptions();
    MY_ORDER['dinnerId'] = parseInt(dinnerId);
  }, []);

  useEffect(() => {
    MY_ORDER['degreeId'] = mySteakDegree;
  }, [mySteakDegree]);

  useEffect(() => {
    MY_ORDER['styleId'] = myStyleId;
  }, [myStyleId]);

  useEffect(() => {
    MY_ORDER['dinnerAmount'] = myDinnerNumber;
  }, [myDinnerNumber]);

  useEffect(() => {
    console.log('myMainOption', myMainOption);
  }, [myMainOption]);

  useEffect(() => {
    console.log('myExtraOptions', myExtraOptions);
  }, [myExtraOptions]);

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
            <StyleComponent
              styleOptions={styleOptions}
              setMyStyleId={setMyStyleId}
            />
            <DeleteMainOptionComponent
              mainOptions={mainOptions}
              setMyMainOption={setMyMainOption}
            />
            <SteakDegreeComponent setMySteakDegree={setMySteakDegree} />
          </div>
          <div className='bottom-right-container'>
            <div className='title-container'>
              <div className='main-title'>추가할 디너 옵션</div>
            </div>
            <ExtraOptionComponent
              loading={loading}
              extraOptions={extraOptions}
              setMyExtraOptions={setMyExtraOptions}
            />
            <div className='dinner-number-and-price-container'>
              <div className='dinner-number-title title'>디너 수량</div>
              <div className='dinner-number-button content'>
                <ChangeDinnerNumberButton
                  myDinnerNumber={myDinnerNumber}
                  setMyDinnerNumber={setMyDinnerNumber}
                />
              </div>
              <div className='total-price-title title'>총 가격</div>
              <div className='total-price-number content'>240,000원</div>
            </div>
            <div className='put-dinner-cart-button-container'>
              <div
                className='put-dinner-cart-button'
                onClick={handlePutCartButtonClick}
              >
                장바구니에 담기
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}

export default OrderPage;
