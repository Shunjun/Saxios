import { assert } from '../utils/utils'

export const xhr = function (options) {
  assert(options, 'options is requird')

  const { data, url, method, header } = options

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  request.send(data)

  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      console.log('请求已完成')
      if (xhr.status >= 200 && xhr.status < 300) {
        console.log(xhr)
      }
    }
  }


  return new Promise((resolve, reject) => {

  })
};

export default xhr;
