export default class Interceptors {
  constructor() {
    this.interceptors = new Map()
    this.index = 0
  }

  use(resolve, reject) {
    this.interceptors.set(this.index, { resolve, reject })
    return this.index++
  }

  forEach(func) {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        func(interceptor)
      }
    })
  }

  eject(interceptorId) {
    interceptorId = Number(interceptorId)
    if (this.interceptors.has(interceptorId) && !isNaN(interceptorId)) {
      this.interceptors.delete(interceptorId)
    }
  }

}