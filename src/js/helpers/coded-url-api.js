import axios from 'axios';
import qs from 'qs';

const getUrl = (jsonData) => new Promise(resolve => {
  axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      //'content-type': 'application/x-www-form-urlencoded',
    },
    url: process.env.GET_CODED_URL_API,
    data: JSON.stringify(jsonData),
  }).then((response) => {
    resolve(response.data.code);
  }).catch((e) => {
    console.log(e);
    resolve('');
  });
});

export {getUrl};
