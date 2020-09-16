export class SaxiosError extends Error {
  constructor({ message, config, code, request, response }) {
    super(message)

    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isSaxiosError = true
  }
}

export function createError({ message, config, code, request, response }) {
  return new SaxiosError({ message, config, code, request, response })
}