import Saxios from "./core/Saxios";
import axios from 'axios'

let saxios = Saxios.create({
  // baseURL: 'http://localhost:8080/',
  headers: {
    get: {
      'asjdioa': 'asjdio'
    },
    'zheshiputongdetou': 'jioo'
  }
})

saxios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log('第一次request', config)

  return config;
}, function (error) {
  // 对请求错误做些什么
  console.log('第一次error', error)
  return Promise.reject(error);
});

saxios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log('第二次request', config)

  return config;
}, function (error) {
  // 对请求错误做些什么
  console.log('第二次error', error)
  return Promise.reject(error);
});

saxios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log('第一次response', response)

  return response;
}, function (error) {
  console.log('第一次 error', error)
  // 对响应错误做点什么
  return Promise.reject(error);
});

console.log(saxios.interceptors)


// saxios.get("../data/1.json#jaishdoiajsdo", {
//   method: 'get',
//   headers: {
//     'content-type': 'application/json;charset=utf-8'
//   },
//   params: {
//     bua: 123,
//     date: new Date()
//   },
//   data: { a: 123 }
// }).then(data => {
//   console.log(data);
// });

let ba = axios.create({
  baseURL: '12123',
  headers: {
    common: {
      uhiashiuad: 123123
    }
  }
})

ba({
  url: '../data/1.json',
  method: "get"
}).then(res => {
  console.log(res)
})




// Make a request for a user with a given ID
// saxios.get("/data/1.json")
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });

// // Optionally the request above could also be done as
// axios.get('/user', {
//     params: {
//       ID: 12345
//     }
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });  

// // Want to use async/await? Add the `async` keyword to your outer function/method.
// async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }