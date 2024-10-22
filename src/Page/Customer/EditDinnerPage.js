/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import { BiPlus, BiMinus } from 'react-icons/bi';
import CustomerLayout from '../../Component/CustomerLayout';
import Header from '../../Component/Header';
import '../../scss/EditDinnerPage.scss';
import { useNavigate } from 'react-router-dom';

function ChangeDinnerNumberButton(props) {
  const myOrder = props.myOrder;
  const setMyOrder = props.setMyOrder;

  const decreaseDinnerNumber = () => {
    if (myOrder['dinnerAmount'] == 0) {
      console.log('더 이상 줄일 수 없습니다');
    } else {
      setMyOrder({ ...myOrder, dinnerAmount: myOrder['dinnerAmount'] - 1 });
    }
  };

  const increaseDinnerNumber = () => {
    setMyOrder({ ...myOrder, dinnerAmount: myOrder['dinnerAmount'] + 1 });
  };

  return (
    <div className='dinner-number-button-container'>
      <div className='dinner-number-button'>
        <div className='button-container'>
          <BiMinus className='button' onClick={decreaseDinnerNumber} />
        </div>
        <div className='number'>{myOrder['dinnerAmount']}</div>
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
  const setTFtotal = props.setTFtotal;
  const [dinnerInfo, setDinnerInfo] = useState({});

  /** 선택한 디너 정보 API 호출 */
  const getDinnerInfo = async () => {
    try {
      const url = `menu/dinners/${dinnerId}`;
      const response = await axios.get(url);
      setDinnerInfo(response.data);
    } catch (error) {
      console.log('getDinnerInfo', error);
    }
  };
  useEffect(() => {
    getDinnerInfo();
  }, []);

  useEffect(() => {
    console.log('[dinnerInfo]', dinnerInfo);
    setTotalPrice(dinnerInfo.dinnerPrice);
    setTFtotal(true);
  }, [dinnerInfo]);
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
  const myOrder = props.myOrder;
  const setMyOrder = props.setMyOrder;

  const handleDegreeButtonClick = (event) => {
    setMyOrder({ ...myOrder, degreeId: parseInt(event.target.id) });
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
            defaultChecked={myOrder['degreeId'] === 1 ? true : false}
          />
          레어
        </label>
        <label>
          <input
            type='radio'
            name='steak-degree'
            id='2'
            value='2'
            defaultChecked={myOrder['degreeId'] === 2 ? true : false}
          />
          미디움레어
        </label>
        <label>
          <input
            type='radio'
            name='steak-degree'
            id='3'
            value='3'
            defaultChecked={myOrder['degreeId'] === 3 ? true : false}
          />
          미디움
        </label>
        <label>
          <input
            type='radio'
            name='steak-degree'
            id='4'
            value='4'
            defaultChecked={myOrder['degreeId'] === 4 ? true : false}
          />
          미디움웰
        </label>
        <label>
          <input
            type='radio'
            name='steak-degree'
            id='5'
            value='5'
            defaultChecked={myOrder['degreeId'] === 5 ? true : false}
          />
          웰던
        </label>
      </div>
    </div>
  );
}

function StyleComponent(props) {
  const myOrder = props.myOrder;
  const setMyOrder = props.setMyOrder;
  const setStylePrice = props.setStylePrice;
  const setTFstyle = props.setTFstyle;

  const [styles, setStyles] = useState([]); // 스타일 목록

  /** 스타일 API 호출 */
  const getStyleOptions = async () => {
    try {
      const url = `menu/styles`;
      const response = await axios.get(url);
      setStyles(response.data.items);
    } catch (error) {
      console.log('getStyleOptions', error);
    }
  };

  const handleStyleButtonClick = (event) => {
    setMyOrder({ ...myOrder, styleId: parseInt(event.target.id) });
    setStylePrice(parseInt(event.target.value));
  };

  useEffect(() => {
    getStyleOptions();
  }, []);

  useEffect(() => {
    console.log('[styles]', styles);
    if (styles.length === 3) {
      const price = styles[parseInt(myOrder['styleId']) - 1].stylePrice;
      setStylePrice(price);
      setTFstyle(true);
    }
  }, [styles]);

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
                  defaultChecked={
                    style.styleId === myOrder['styleId'] ? true : false
                  }
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
  const myOrder = props.myOrder;
  const setDeletePrice = props.setDeletePrice;
  const setMyMainOption = props.setMyMainOption;
  const myOldOptions = props.myOldOptions;
  const setTFdelete = props.setTFdelete;
  const setModify = props.setModify;
  const myMainOption = props.myMainOption;

  const dinnerId = myOrder['dinnerId'];

  const [mainOptions, setMainOptions] = useState([]); // 삭제 디너 옵션 리스트

  /** 선택한 삭제 디너 옵션 정보 호출 */
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
      console.log('getMainOptions', error);
    }
  };

  useEffect(() => {
    getMainOptions();
  }, []);

  useEffect(() => {
    console.log('[mainOptions]', mainOptions);
    if (mainOptions.length != 0) {
      /** 처음 myMainOption 설정 */
      myOldOptions.map((myOption) => {
        mainOptions.map((mainOption) => {
          if (myOption.dinnerOptionId === mainOption.dinnerOptionId) {
            const tmpOption = {
              id: parseInt(myOption.dinnerOptionId),
              amount: 1,
            };
            setMyMainOption(tmpOption);
            setDeletePrice(mainOption.dinnerOptionPrice);
            setTFdelete(true);
          }
        });
      });
    }
    if (!(myMainOption.id == 1 || myMainOption.id == 2 || myMainOption.id == 3)) setTFdelete(true);
  }, [mainOptions]);

  const handleMainOptionClick = (event) => {
    setModify(true);
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
                defaultChecked={myOldOptions.some(
                  (myOption) =>
                    myOption.dinnerOptionId === mainOption.dinnerOptionId,
                )}
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
  const extraOption = props.extraOption;
  const optionNumber = props.optionNumber;
  const setOptionNumber = props.setOptionNumber;
  const setOptionPrice = props.setOptionPrice;
  const dinnerOptionPrice = props.dinnerOptionPrice;
  const myOldOptions = props.myOldOptions;
  const setModify = props.setModify;

  const decreaseOptionNumber = () => {
    if (optionNumber == 0) {
      console.log('더 이상 줄일 수 없습니다');
    } else {
      setModify(true);
      setOptionNumber((prev) => prev - 1);
      setOptionPrice((prev) => prev - dinnerOptionPrice);
    }
  };

  const increaseOptionNumber = () => {
    setModify(true);
    setOptionNumber((prev) => prev + 1);
    setOptionPrice((prev) => prev + dinnerOptionPrice);
  };

  useEffect(() => {
    const option = myOldOptions.find(
      (o) => o.dinnerOptionId === extraOption.dinnerOptionId,
    );
    if (option) {
      setOptionNumber(option.amount);
    } else setOptionNumber(0);
  }, []);

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

/** 옵션 한 줄! */
function ExtraOptionItem(props) {
  const extraOption = props.extraOption; // 그 배열 자체
  const setNewExtraOption = props.setNewExtraOption;
  const setOptionPrice = props.setOptionPrice;
  const myOldOptions = props.myOldOptions;
  const setModify = props.setModify;
  const modify = props.modify;
  const [optionNumber, setOptionNumber] = useState(0);

  useEffect(() => {
    const tmpObject = {
      id: extraOption.dinnerOptionId,
      amount: optionNumber,
    };
    if (modify) {
      setNewExtraOption(tmpObject);
    }
  }, [optionNumber]);

  return (
    <>
      <div className='dinner-option-name'>{extraOption.dinnerOptionDetail}</div>
      <div className='dinner-option-price'>
        {extraOption.dinnerOptionPrice}원
      </div>
      <div className='dinner-option-button'>
        <ChangeOptionNumberButton
          setOptionPrice={setOptionPrice}
          dinnerOptionPrice={props.extraOption.dinnerOptionPrice}
          myOldOptions={myOldOptions}
          setOptionNumber={setOptionNumber}
          optionNumber={optionNumber}
          extraOption={extraOption}
          setModify={setModify}
        />
      </div>
    </>
  );
}

function ExtraOptionComponent(props) {
  const myOrder = props.myOrder;
  const setOptionPrice = props.setOptionPrice;
  const myExtraOptions = props.myExtraOptions;
  const setMyExtraOptions = props.setMyExtraOptions;
  const myOldOptions = props.myOldOptions;
  const setModify = props.setModify;
  const modify = props.modify;

  const [loading, setLoading] = useState(true);
  const [extraOptions, setExtraOptions] = useState([]); // 추가 구성품 모든 목록

  const [newExtraOption, setNewExtraOption] = useState({});

  /** 선택한 디너 옵션 정보 호출 */
  const getExtraOptions = async () => {
    /** 일단 이 try 함수 안에서 해당 디너의 옵션들을 모두 불러온다 */
    try {
      const url = `menu/dinners/${myOrder['dinnerId']}/options`;
      const response = await axios.get(url);
      const options = await response.data; // 그걸 options에 저장!
      const extraOptionList = options.filter(
        (option) => option.dinnerOptionName === '추가 구성품',
      ); // 그 options에서도 추가 구성품만 extraOptionList에 저장될 수 있도록

      // console.log('extraOptionList', extraOptionList); // 잘 가져와진다.
      setExtraOptions(extraOptionList);
      setLoading(false);
    } catch (error) {
      console.log('getEstraOptions', error);
    }
  }; // 결론: extraOptions에 추가 구성품 배열들 예쁘게 가져와짐

  useEffect(() => {
    getExtraOptions();
  }, []); // 딱 시작할 때 가져올 수 있도록

  useEffect(() => {
    console.log('[newExtraOption]', newExtraOption);
    const newId = newExtraOption.id;
    const newAmount = newExtraOption.amount;

    /**
     * 만약 newExtraOption의 id가 myExtraOptions에 있으면
     * amount값만 변경하고
     * myExtraOptions에 없으면 해당 newExtraOption을 추가한다
     */
    if (modify) {
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
                  <ExtraOptionItem // 그 option들 딱 배열될 수 있도록
                    key={extraOption.dinnerOptionId} // 배열 id랑
                    extraOption={extraOption}
                    setNewExtraOption={setNewExtraOption}
                    setOptionPrice={setOptionPrice}
                    myOldOptions={myOldOptions}
                    setModify={setModify}
                    modify={modify}
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
  // degreeId, dinnerAmount, dinnerId, orderDinnerId, orderDinnerOptions, orderId, styleId, totalDinnerPrice
  const orderId = dinner.orderId; // 수정하려는 오더번호
  const dinnerId = dinner.dinnerId; // 수정하려는 디너번호

  const [myMainOption, setMyMainOption] = useState({});
  const [myExtraOptions, setMyExtraOptions] = useState([]);
  const [myOptions, setMyOptions] = useState([]);

  const [stylePrice, setStylePrice] = useState(0);
  const [deletePrice, setDeletePrice] = useState(0);
  const [optionPrice, setOptionPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0); // totalPrice = 디너 가격 + 옵션s 가격
  const [finalPrice, setFinalPrice] = useState(0); // FinalPrice = dinner-number * (totalPrice + stylePrice - deletePrice)

  const navigate = useNavigate();

  const [myOrder, setMyOrder] = useState({
    degreeId: dinner.degreeId,
    dinnerId: dinner.dinnerId,
    styleId: dinner.styleId,
    dinnerOptionIds: [],
    dinnerAmount: dinner.dinnerAmount,
  }); // 잘 저장 됨

  const myOldOptions = dinner.orderDinnerOptions;

  const [temp3, setTemp3] = useState([]);

  useEffect(() => {
    console.log('[myMainOption]', myMainOption);
    if (modify) {
      setMyOptions([...myExtraOptions, myMainOption]);
    } else {
      setTemp3(myOldOptions.filter((option) => option.dinnerOptionId !== myMainOption.id));
    }
  }, [myMainOption]);

  const [temp4, setTemp4] = useState([]);

  useEffect(() => {
    console.log('[temp3]', temp3);
    if (!modify) {
      const tmpDinnerOptions = temp3.map((dinnerOption) => {
        return {
          id: dinnerOption.dinnerOptionId,
          amount: dinnerOption.amount,
        };
      });
      setTemp4(tmpDinnerOptions);
    }
  }, [temp3]);

  useEffect(() => {
    console.log('[temp4]', temp4);
    if (!modify) {
      setMyExtraOptions(temp4);
    }
  }, [temp4]);

  useEffect(() => {
    console.log('[myExtraOptions]', myExtraOptions);
    if (!(myMainOption.id == 1 || myMainOption.id == 2 || myMainOption.id == 3)) setMyOptions(myExtraOptions);
    else setMyOptions([...myExtraOptions, myMainOption]);
  }, [myExtraOptions]);

  useEffect(() => {
    console.log('[myOptions]', myOptions);
    setMyOrder({ ...myOrder, dinnerOptionIds: myOptions });
  }, [myOptions]);

  const handleChangeDinnerClick = async () => {
    try {
      const token = localStorage.getItem('customerToken');

      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = myOrder;
      const url = `/orders/${orderId}/dinners/${orderDinnerId}`;
      const response = await axios.put(url, data, options);
      console.log('[handlePutCartButtonClick] ', response.data);
      alert('디너가 수정되었습니다.');
      navigate('/myorder');
    } catch (error) {
      console.log('handleChangeDinnerClick', error);
    }
  };

  const [start, setStart] = useState(true); // 시작하면 true, 맨 처음에 가격 다 불러온 후 optionPrice 계산하면 false
  const [TFtotal, setTFtotal] = useState(false); // 시작하면 false, total 가격 불러오면 true
  const [TFstyle, setTFstyle] = useState(false); // 시작하면 false, style 가격 불러오면 true
  const [TFdelete, setTFdelete] = useState(false); // 시작하면 false, delete 가격 불러오면 true
  const [modify, setModify] = useState(false); // 버튼 누르기 전까지 false, option(delete든 extra든) 수정 버튼 한 개라도 누르면 true

  /** 업로드 될 때마다 가격 수정 */
  useEffect(() => {
    console.log(
      '[가격] %d * ( %d + %d + %d %d)',
      myOrder['dinnerAmount'],
      totalPrice,
      optionPrice,
      stylePrice,
      deletePrice,
    );
    setFinalPrice(
      myOrder['dinnerAmount'] * (totalPrice + optionPrice + stylePrice + deletePrice),
    );
    console.log('[myOrder]', myOrder);
    if (start && TFtotal && TFstyle && TFdelete) {
      setOptionPrice(dinner['totalDinnerPrice'] / myOrder['dinnerAmount'] - totalPrice - stylePrice - deletePrice);
      setStart(false);
    }
  }, [totalPrice, optionPrice, myOrder, stylePrice, deletePrice]);

  return (
    <CustomerLayout>
      <Header />
      <div className='order-container'>
        <TopInfoComponent dinnerId={dinnerId} setTotalPrice={setTotalPrice} setTFtotal={setTFtotal} />
        <div className='bottom-info-container'>
          <div className='bottom-left-container'>
            <StyleComponent
              myOrder={myOrder}
              setMyOrder={setMyOrder}
              setStylePrice={setStylePrice}
              setTFstyle={setTFstyle}
            />
            <SteakDegreeComponent myOrder={myOrder} setMyOrder={setMyOrder} />
            <DeleteMainOptionComponent
              myOrder={myOrder}
              setDeletePrice={setDeletePrice}
              setMyMainOption={setMyMainOption}
              myOldOptions={myOldOptions}
              setTFdelete={setTFdelete}
              setModify={setModify}
              myMainOption={myMainOption}
            />
          </div>
          <div className='bottom-right-container'>
            <div className='title-container'>
              <div className='main-title'>추가할 디너 옵션</div>
            </div>
            <ExtraOptionComponent
              myOrder={myOrder}
              setOptionPrice={setOptionPrice}
              myExtraOptions={myExtraOptions}
              setMyExtraOptions={setMyExtraOptions}
              myOldOptions={myOldOptions}
              setModify={setModify}
              modify={modify}
            />
            <div className='dinner-number-and-price-container'>
              <div className='dinner-number-title title'>디너 수량</div>
              <div className='dinner-number-button content'>
                <ChangeDinnerNumberButton
                  myOrder={myOrder}
                  setMyOrder={setMyOrder}
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
