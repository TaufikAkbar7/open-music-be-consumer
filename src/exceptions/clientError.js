class ClientError extends Error {
  constructor(message, statusCode = 400) {
    super(message)
    this.statusCode = statusCode
    this.name = 'ClientError'
    this.isClientError = true
    Object.setPrototypeOf(this, ClientError.prototype)
  }
}

module.exports = ClientError
