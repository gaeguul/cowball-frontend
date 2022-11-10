import React from 'react';
import axios from 'axios';

// axios.defaults.baseURL =
//   'https://stoplight.io/mocks/hoqn/cowball-mrdaebak/106750649';

/**
 * axios('GET/POST/PUT/DELETE 등', '/messages', { 넘겨줄 값 }); 의 형태로 사용하면 된다
 */
// const fetcher = async (method, url, ...rest) => {
//   const res = await axios[method](url, ...rest);

//   return res.data;
// };

// const [msgs, setMsgs] = useState([]);

// const getMessages = async () => {
//   const msgs = await fetcher('get', '/messages');
//   setMsgs(msgs);
// };

// useEffect(() => {
//   getMessages();
//   console.log('서버 연결 완료');
// }, []);

const baseURL = `https://stoplight.io/mocks/hoqn/cowball-mrdaebak/106750649/users`;

async function getData() {
  try {
    //응답 성공
    const response = await axios.get(baseURL, {
      params: {
        grade: 'normal',
      },
    });
    console.log(response.data);
  } catch (error) {
    //응답 실패
    console.error(error);
  }
}

function MainPage() {
  // console.log(baseURL);

  const options = {
    method: 'GET',
    url: baseURL,
    params: { grade: 'vip' },
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer undefined',
    },
  };

  axios
    .request(options)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

  getData();

  return <div>This is Main Page</div>;
}

export default MainPage;
