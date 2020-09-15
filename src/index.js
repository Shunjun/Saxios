import Saxios from "./saxios";
import axios from 'axios'

let saxios = Saxios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    get: {
      'asjdioa': 'asjdio'
    },
    'zheshiputongdetou': 'jioo'
  }
})

saxios.get("../data/1.json#jaishdoiajsdo", {
  method: 'get',
  headers: {
    'content-type': 'application/json;charset=utf-8'
  },
  params: {
    bua: 123,
    date: new Date()
  },
  data: { a: 123 }
}).then(data => {
  console.log(data);
});



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