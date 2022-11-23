import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import { BiPlus, BiMinus } from 'react-icons/bi';
import CustomerLayout from '../Component/CustomerLayout';
import Header from '../Component/Header';
import '../scss/EditDinnerPage.scss';

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
  const dinnerId = props.dinnerId;
  const setTotalPrice = props.setTotalPrice;
  const [dinnerInfo, setDinnerInfo] = useState({});

  /** 선택한 디너 정보 API 호출 */
  const getDinnerInfo = async () => {
    try {
      const url = `menu/dinners/${dinnerId}`;
      const response = await axios.get(url);
      setDinnerInfo(response.data);
      setTotalPrice(response.data.dinnerPrice);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDinnerInfo();
  }, []);
  return (
    <div className='top-info-container'>
      <div className='img-container'>
        <img className='steak-image' alt='steak-image' src='/img/steak2.png' />
      </div>
      <div className='right-info-container'>
        <div className='dinner-title-ko'>{dinnerInfo.dinnerName}</div>
        <div className='dinner-title-en'>Valentine Dinner</div>
        <div className='dinner-detail'>{dinnerInfo.dinnerDetail}</div>
        <div className='dinner-price-title'>
          <span className='dinner-price'>{dinnerInfo.dinnerPrice}</span>
          <span>원</span>
        </div>
      </div>
    </div>
  );
}

function SteakDegreeComponent(props) {
  const setMySteakDegree = props.setMySteakDegree;
  const mySteakDegree = props.mySteakDegree;

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
          <input
            type='radio'
            name='steak-degree'
            id='1'
            value='1'
            defaultChecked={mySteakDegree === 1 ? true : false}
          />
          레어
        </label>
        <label>
          <input
            type='radio'
            name='steak-degree'
            id='2'
            value='2'
            defaultChecked={mySteakDegree === 2 ? true : false}
          />
          미디움레어
        </label>
        <label>
          <input
            type='radio'
            name='steak-degree'
            id='3'
            value='3'
            defaultChecked={mySteakDegree === 3 ? true : false}
          />
          미디움
        </label>
        <label>
          <input
            type='radio'
            name='steak-degree'
            id='4'
            value='4'
            defaultChecked={mySteakDegree === 4 ? true : false}
          />
          미디움웰
        </label>
        <label>
          <input
            type='radio'
            name='steak-degree'
            id='5'
            value='5'
            defaultChecked={mySteakDegree === 5 ? true : false}
          />
          웰던
        </label>
      </div>
    </div>
  );
}

function StyleComponent(props) {
  // const styleOptions = props.styleOptions;
  const myStyleId = props.myStyleId;
  const setMyStyleId = props.setMyStyleId;
  const setStylePrice = props.setStylePrice;

  const [styles, setStyles] = useState([]);

  /** 스타일 API 호출 */
  const getStyleOptions = async () => {
    try {
      const url = `menu/styles`;
      const response = await axios.get(url);

      setStyles(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStyleButtonClick = (event) => {
    setMyStyleId(parseInt(event.target.id));
    setStylePrice(parseInt(event.target.value));
  };

  useEffect(() => {
    getStyleOptions();
  }, []);

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
          {styles.map((style) => {
            return (
              <label key={style.styleId}>
                <input
                  type='radio'
                  name='style'
                  id={style.styleId}
                  value={style.stylePrice}
                  defaultChecked={style.styleId === myStyleId ? true : false}
                />
                {style.styleName} 스타일
                <span className='option-price'>(+{style.stylePrice}원)</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DeleteMainOptionComponent(props) {
  const dinnerId = props.dinnerId;
  const setMyMainOption = props.setMyMainOption;
  const setDeletePrice = props.setDeletePrice;
  const myOptions = props.myOptions;

  const [mainOptions, setMainOptions] = useState([]);

  /** 선택한 디너 옵션 정보 호출 */
  const getMainOptions = async () => {
    try {
      const url = `menu/dinners/${dinnerId}/options`;
      const response = await axios.get(url);
      const options = await response.data;
      const mainOptionList = options.filter(
        (option) => option.dinnerOptionName === '메인메뉴 삭제',
      );

      setMainOptions(mainOptionList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMainOptions();
    console.log('myOptions', myOptions);
  }, []);

  const handleMainOptionClick = (event) => {
    const tmpOption = {
      id: parseInt(event.target.id),
      amount: 1,
    };
    setMyMainOption(tmpOption);
    setDeletePrice(parseInt(event.target.value));
  };

  return (
    <div className='menu-item-container'>
      <div className='title-container'>
        <div className='main-title'>메뉴 구성</div>
        <div className='sub-title'>
          [선택사항] 구성 메뉴 삭제는 스테이크를 제외한 메뉴 중 한 가지만
          가능합니다.
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
                value={mainOption.dinnerOptionPrice}
                defaultChecked={myOptions.map((myOption) => {
                  myOption.dinnerOptionId === mainOption.dinnerOptionId
                    ? true
                    : false;
                })}
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
  const setTotalPrice = props.setTotalPrice;
  const dinnerOptionPrice = props.dinnerOptionPrice;

  const decreaseOptionNumber = () => {
    if (optionNumber == 0) {
      console.log('더 이상 줄일 수 없습니다');
    } else {
      setOptionNumber((prev) => prev - 1);
      setTotalPrice((totalPrice) => totalPrice - dinnerOptionPrice);
    }
  };

  const increaseOptionNumber = () => {
    setOptionNumber((prev) => prev + 1);
    setTotalPrice((totalPrice) => totalPrice + dinnerOptionPrice);
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
  const dinnerOptionId = extraOption.dinnerOptionId;
  const setNewExtraOption = props.setNewExtraOption;
  const setTotalPrice = props.setTotalPrice;
  // const myOptionNumber = props.myOptionNumber;

  // console.log('myOptionNumber', myOptionNumber);

  const [optionNumber, setOptionNumber] = useState(0);

  useEffect(() => {
    // console.log('dinnerOptionId', dinnerOptionId, 'optionNumber', optionNumber);
    const tmpObject = {
      id: dinnerOptionId,
      amount: optionNumber,
    };
    setNewExtraOption(tmpObject);
  }, [optionNumber]);

  return (
    <>
      <div className='dinner-option-name'>{extraOption.dinnerOptionDetail}</div>
      <div className='dinner-option-price'>
        {extraOption.dinnerOptionPrice}원
      </div>
      <div className='dinner-option-button'>
        <ChangeOptionNumberButton
          optionNumber={optionNumber}
          setOptionNumber={setOptionNumber}
          setTotalPrice={setTotalPrice}
          dinnerOptionPrice={props.extraOption.dinnerOptionPrice}
        />
      </div>
    </>
  );
}

function ExtraOptionComponent(props) {
  const dinnerId = props.dinnerId;
  const myExtraOptions = props.myExtraOptions;
  const setMyExtraOptions = props.setMyExtraOptions;
  const setTotalPrice = props.setTotalPrice;
  // const myOptions = props.myOptions;

  const [loading, setLoading] = useState(true);
  const [extraOptions, setExtraOptions] = useState([]);
  const [newExtraOption, setNewExtraOption] = useState({});

  /** 선택한 디너 옵션 정보 호출 */
  const getExtraOptions = async () => {
    try {
      const url = `menu/dinners/${dinnerId}/options`;
      const response = await axios.get(url);
      const options = await response.data;
      const extraOptionList = options.filter(
        (option) => option.dinnerOptionName === '추가 구성품',
      );

      setExtraOptions(extraOptionList);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExtraOptions();
  }, []);

  useEffect(() => {
    console.log('newExtraOption', newExtraOption);
    const newId = newExtraOption.id;
    const newAmount = newExtraOption.amount;

    /**
     * 만약 newExtraOption의 id가 myExtraOptions에 있으면
     * amount값만 변경하고
     * myExtraOptions에 없으면 해당 newExtraOption을 추가한다
     */
    if (!myExtraOptions.find((option) => option.id === newId)) {
      //myExtraOptions에 newId가 없는 경우
      setMyExtraOptions((prev) => [...prev, newExtraOption]);
    } else {
      //myExtraOptions에 newId가 있는 경우
      setMyExtraOptions(
        myExtraOptions.map((option) =>
          option.id === newId ? { ...option, amount: newAmount } : option,
        ),
      );
    }
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
                    setTotalPrice={setTotalPrice}
                  />
                );
              })}
          </>
        )}
      </div>
    </div>
  );
}

function EditDinnerPage() {
  const location = useLocation();

  const orderDinnerId = location.state.orderDinnerId; //수정하려는 오더디너번호
  const dinner = location.state.dinner; //수정하려는 오더디너 정보
  const orderId = dinner.orderId; //수정하려는 오더번호

  console.log('orderDinnerId', orderDinnerId);
  console.log('dinner', dinner);

  const dinnerId = dinner.dinnerId;

  const [mySteakDegree, setMySteakDegree] = useState(dinner.degreeId); //필수
  const [myStyleId, setMyStyleId] = useState(dinner.styleId); //필수
  const [myMainOption, setMyMainOption] = useState({});
  const [myExtraOptions, setMyExtraOptions] = useState([]);

  // const tmpDinnerOptions = dinner.orderDinnerOptions.map((dinnerOption) => {
  //   return {
  //     dinnerOptionId: dinnerOption.dinnerOptionId,
  //     amount: dinnerOption.amount,
  //   };
  // });

  const [myOptions, setMyOptions] = useState([]);
  const [myDinnerNumber, setMyDinnerNumber] = useState(dinner.dinnerAmount); //주문할 디너 개수

  const [stylePrice, setStylePrice] = useState(0);
  const [deletePrice, setDeletePrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0); // totalPrice = 디너 가격 + 옵션s 가격
  const [finalPrice, setFinalPrice] = useState(0); // FinalPrice = dinner-number * (totalPrice + stylePrice - deletePrice)

  let MY_ORDER = {
    degreeId: dinner.degreeId,
    dinnerId: dinner.dinnerId,
    styleId: dinner.styleId,
    dinnerOptionIds: [],
    dinnerAmount: dinner.dinnerAmount,
  };

  const handleChangeDinnerClick = () => {
    // MY_ORDER['dinnerOptionIds'] = myOptions;
    console.log('myOptions', myOptions);
    console.log('MY_ORDER', MY_ORDER);
    console.log('orderId', orderId);
  };

  useEffect(() => {
    MY_ORDER['dinnerId'] = dinnerId;

    const tmpDinnerOptions = dinner.orderDinnerOptions.map((dinnerOption) => {
      return {
        dinnerOptionId: dinnerOption.dinnerOptionId,
        amount: dinnerOption.amount,
      };
    });

    setMyOptions(tmpDinnerOptions);
    console.log('tmpDinnerOptions', tmpDinnerOptions);
  }, []);

  useEffect(() => {
    MY_ORDER['dinnerOptionIds'] = myOptions;
  }, [myOptions]);

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
    // console.log('myExtraOptions', myExtraOptions);
    // console.log('myMainOption.id', !myMainOption.id);
    // if (!myMainOption.id) {
    //   const tmpOptions = [...myExtraOptions];
    //   tmpOptions.splice(0, 2);
    //   setMyOptions(tmpOptions);
    //   console.log(tmpOptions);
    //   setMyOptions(tmpOptions);
    //   MY_ORDER['dinnerOptionIds'] = tmpOptions;
    // } else {
    //   const tmpOptions = [myMainOption, ...myExtraOptions];
    //   tmpOptions.splice(1, 2);
    //   setMyOptions(tmpOptions);
    //   console.log(tmpOptions);
    //   setMyOptions(tmpOptions);
    //   MY_ORDER['dinnerOptionIds'] = tmpOptions;
    // }
  }, [myMainOption, myExtraOptions]);

  useEffect(() => {
    console.log(
      '%d * ( %d + %d %d)',
      myDinnerNumber,
      totalPrice,
      stylePrice,
      deletePrice,
    );
    setTotalPrice(totalPrice);
    setFinalPrice(myDinnerNumber * (totalPrice + stylePrice + deletePrice));
  }, [totalPrice, myDinnerNumber, stylePrice, deletePrice]);

  return (
    <CustomerLayout>
      <Header />
      <div className='order-container'>
        <TopInfoComponent dinnerId={dinnerId} setTotalPrice={setTotalPrice} />
        <div className='bottom-info-container'>
          <div className='bottom-left-container'>
            <StyleComponent
              myStyleId={myStyleId}
              setMyStyleId={setMyStyleId}
              setStylePrice={setStylePrice}
            />
            <SteakDegreeComponent
              mySteakDegree={mySteakDegree}
              setMySteakDegree={setMySteakDegree}
            />
            <DeleteMainOptionComponent
              dinnerId={dinnerId}
              myOptions={dinner.orderDinnerOptions}
              setMyMainOption={setMyMainOption}
              setDeletePrice={setDeletePrice}
            />
          </div>
          <div className='bottom-right-container'>
            <div className='title-container'>
              <div className='main-title'>추가할 디너 옵션</div>
            </div>
            <ExtraOptionComponent
              dinnerId={dinnerId}
              myOptions={myOptions}
              myExtraOptions={myExtraOptions}
              setMyExtraOptions={setMyExtraOptions}
              setTotalPrice={setTotalPrice}
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
              <div className='total-price-number content'>{finalPrice}원</div>
            </div>
            <div className='put-dinner-cart-button-container'>
              <div
                className='put-dinner-cart-button'
                onClick={handleChangeDinnerClick}
              >
                주문 수정
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}

export default EditDinnerPage;
