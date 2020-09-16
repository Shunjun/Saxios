# Saxios

一个更完善的 `axios` 网络请求库,同时兼容 fetch 与 XHR, 具备 `axios` 所有的特点,

未完待续....

## 可接受的参数

```js
{
  // `url` string 请求的地址
  url: "",

  // `method` string 请求的方法,大小写不敏感
  method: "GET", // 默认为'GET'

  // `baseURL` string 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL.
  baseURL: "",

  // `transformRequest`  function | [function]  允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 数组最后的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [
    function (data, headers) {
      // 对 data 进行任意转换处理
      return data;
    },
  ],

  // `transformResponse` function | [function] 修改响应数据
  transformResponse: [
    function (data) {
      // 对 data 进行任意转换处理
      return data;
    },
  ],

  // defaultHeaders, 保存的默认请求头
  defaultHeaders: {
    common: {
      "X-Requested-With": "XMLHttpRequest",
    },
    GET: {},
    POST: {},
    "X-Requested-With": "XMLHttpRequest",
  },

  // headers {} 传入的请求头
  headers: {},

  // `params` URLSearchParams 是即将与请求一起发送的 URL 参数
  params: {
    ID: 12345,
  },

  // `paramsSerializer` function 是一个负责 `params` 序列化的函数
  paramsSerializer: function (params) {
    return Qs.stringify(params, { arrayFormat: "brackets" });
  },

  // `timeout` number 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 0, // 默认为 0

 // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: "json", // 默认为 "json"
};
```
