import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CustomerLayout from '../Component/CustomerLayout';
import Header from '../Component/Header';
import '../scss/MainPage.scss';

function DinnerItem(props) {
  const param = props.dinner.dinnerId;

  return (
    <Link to={`/order/${param}`}>
      <div className='dinner'>
        <div className='dinner-image'>
          <img
            className='steak-image'
            alt='steak-image'
            src='/img/steak2.png'
          />
        </div>
        <div className='dinner-info'>
          <div className='dinner-name-ko'>{props.dinner.dinnerName}</div>
          <div className='dinner-name-en'>Valentine Dinner</div>
          <div className='dinner-detail'>{props.dinner.dinnerDetail}</div>
        </div>
      </div>
    </Link>
  );
}

function DinnerList(props) {
  return (
    <div className='main-container'>
      <div className='dinner-list-container'>
        {props.dinners.map((dinner) => {
          return <DinnerItem key={dinner.dinnerId} dinner={dinner} />;
        })}
      </div>
    </div>
  );
}

function MainPage() {
  const [dinners, setDinners] = useState([]);

  useEffect(() => {
    // const getDinnerInfo = async () => {
    //   try {
    //     const url = `http://ec2-3-39-248-238.ap-northeast-2.compute.amazonaws.com:8080/api/v1/menu/dinners/1`;
    //     const response = await axios.get(url);
    //     console.log(response.data);
    //     // setDinnerInfo(response.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // getDinnerInfo();

    // const getDinnerIngredient = async () => {
    //   try {
    //     const url = `http://ec2-3-39-248-238.ap-northeast-2.compute.amazonaws.com:8080/api/v1/menu/dinners/1/options`;
    //     const response = await axios.get(url);
    //     console.log(response.data);

    //     response.data.map((option) => {
    //       if (option.dinnerOptionName == '메인메뉴 삭제') {
    //         // setMainOptions([...mainOptions, option]);
    //         console.log(option.dinnerOptionDetail);
    //       } else {
    //         // setExtraOptions([...extraOptions, option]);
    //         console.log(option.dinnerOptionDetail);
    //       }
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // getDinnerIngredient();

    const getDinners = async () => {
      try {
        const url =
          'http://ec2-3-39-248-238.ap-northeast-2.compute.amazonaws.com:8080/api/v1/menu/dinners';
        const response = await axios.get(url);
        // console.log(response.data.items);
        setDinners(response.data.items);
      } catch (error) {
        console.log(error);
      }
    };
    getDinners();
  }, []);

  return (
    <CustomerLayout>
      <Header />
      <DinnerList dinners={dinners} />
    </CustomerLayout>
  );
}

export default MainPage;
