var config = {
  host: '127.0.0.1',
  port: process.env.NODE_ENV == 'production' ? 6379 : 5498,
  password: '',
  preFix: 'm'
}
module.exports = config