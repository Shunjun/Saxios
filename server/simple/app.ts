import axios from '../../src/core/saxios';
// import axios from 'axios';

// axios.interceptors.request.use((value) => {
//   console.log(value);
//   return value;
// });

axios({
  method: 'get',
  baseURL: '/simple/',
  url: '/get',
  params: {
    a: 1,
    b: 2,
  },
  // transformResponse() {},
  // transformRequest(data, config) {
  //   console.log(config);
  //   return config;
  // },
});
