import React, { useState, useEffect } from 'react';
import CustomerLayout from '../Component/CustomerLayout';
import Header from '../Component/Header';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../scss/OrderPage.scss';

//const [prePrice, serPrePrice] = useState(0);
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
  // const styleOptions = props.styleOptions;
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

function OrderPage() {
  const { dinnerId } = useParams(); //현재 접속한 페이지의 디너번호

  const [mySteakDegree, setMySteakDegree] = useState(0); //필수
  const [myStyleId, setMyStyleId] = useState(0); //필수
  const [myMainOption, setMyMainOption] = useState({});
  const [myExtraOptions, setMyExtraOptions] = useState([]);
  const [myOptions, setMyOptions] = useState([]);

  /**장바구니 담기 버튼에 의해서만 업데이트 된다 */
  const [stylePrice, setStylePrice] = useState(0);
  const [deletePrice, setDeletePrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0); // totalPrice = 디너 가격 + 옵션s 가격
  const [finalPrice, setFinalPrice] = useState(0); // FinalPrice = dinner-number * (totalPrice + stylePrice - deletePrice)

  const navigate = useNavigate();
  /**주문할 디너 개수 */
  const [myDinnerNumber, setMyDinnerNumber] = useState(1);

  const handlePutCartButtonClick = async () => {
    MY_ORDER['dinnerOptionIds'] = myOptions;
    console.log('MY_ORDER', MY_ORDER);

    /** [POST] 장바구니에 추가 */
    try {
      if (mySteakDegree == 0 || myStyleId == 0) {
        alert('스타일과 스테이크 굽기 단계를 설정해주세요.');
      } else {
        const token = localStorage.getItem('customerToken');
        const userId = localStorage.getItem('customerId');

        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const data = MY_ORDER;
        const url = `cart/${userId}`;
        const response = await axios.post(url, data, options);
        console.log('MY_ORDER', data);
        console.log('[handlePutCartButtonClick] ', response.data);
        alert('디너가 장바구니에 담겼습니다. 장바구니를 확인하세요.');
        // window.location.replace('/cart');
        navigate('/cart');
      }
    } catch (error) {
      console.log(error);
      console.log('MY_ORDER', MY_ORDER);
      // alert('스타일과 스테이크 굽기 단계를 선택해주세요.');
    }
  };

  useEffect(() => {
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
    console.log('myExtraOptions', myExtraOptions);
    console.log('myMainOption.id', !myMainOption.id);
    // const tmpOptions = [myMainOption, ...myExtraOptions];

    if (!myMainOption.id) {
      const tmpOptions = [...myExtraOptions];
      tmpOptions.splice(0, 2);
      setMyOptions(tmpOptions);
      console.log(tmpOptions);
      setMyOptions(tmpOptions);
      MY_ORDER['dinnerOptionIds'] = tmpOptions;
    } else {
      const tmpOptions = [myMainOption, ...myExtraOptions];
      tmpOptions.splice(1, 2);
      setMyOptions(tmpOptions);
      console.log(tmpOptions);
      setMyOptions(tmpOptions);
      MY_ORDER['dinnerOptionIds'] = tmpOptions;
    }
    // console.log('before', tmpOptions);

    // if (!myMainOption.id) {
    //   tmpOptions.splice(1, 2);
    // } else {
    //   tmpOptions.splice(0, 3);
    // }
    // console.log('after', tmpOptions);
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
              setMyStyleId={setMyStyleId}
              setStylePrice={setStylePrice}
            />
            <SteakDegreeComponent setMySteakDegree={setMySteakDegree} />
            <DeleteMainOptionComponent
              dinnerId={dinnerId}
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
