const config = {
  host: process.env.NODE_ENV == 'production' ? 'localhost' : '47.100.12.188',
  port: process.env.NODE_ENV == 'production' ? '27017' : '27017',
  username: 'miniapp',
  password: 'miniapp',
  database: 'miniapp',
  options: {
    reconnectInterval: 500, // Reconnect every 500ms
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    poolSize: 10, // Maintain up to 10 socket connections
    useNewUrlParser: true,
  },
}
module.exports = config
