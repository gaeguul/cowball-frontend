import React from 'react';
import axios from 'axios';

const baseURL = `https://stoplight.io/mocks/hoqn/cowball-mrdaebak/106750649/`;

function GetDinners() {
  const options = {
    method: 'GET',
    url: `menu/dinners`,
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer undefined',
    },
  };

  const getDinners = async () => {
    try {
      const response = await axios.get(baseURL + 'menu/dinners', options);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={getDinners}>디너조회</button>
    </div>
  );
}

export default GetDinners;
