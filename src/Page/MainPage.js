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
            src={props.dinner.dinnerImageUrl}
          />
        </div>
        <div className='dinner-info'>
          <div className='dinner-name-ko'>{props.dinner.dinnerName}</div>
          <div className='dinner-name-en'>{props.dinner.dinnerNameEn}</div>
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDinners = async () => {
      try {
        setLoading(true);
        const url = `menu/dinners`;
        const response = await axios.get(url);
        // console.log(response.data.items);
        setDinners(response.data.items);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getDinners();
  }, []);

  return (
    <CustomerLayout>
      <Header />
      {loading ? <></> : <DinnerList dinners={dinners} />}
    </CustomerLayout>
  );
}

export default MainPage;
