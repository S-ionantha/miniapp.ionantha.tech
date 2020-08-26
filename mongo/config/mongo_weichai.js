/*
 * @Description:
 * @Author: ionantha
 * @Date: 2019-08-21 15:56:39
 * @LastEditors: sungw
 * @LastEditTime: 2019-11-26 15:04:33
 */
const config = {
  ip: '172.17.62.115', // 内网
  server: '39.107.92.154', // 公网
  host: process.env.NODE_ENV === 'production' ? 'localhost' : '139.199.128.133',
  port: process.env.NODE_ENV === 'production' ? '38128' : '38128',
  username: 'weichai',
  password: 'weichaim1m.',
  database: 'weichai',
  options: {
    reconnectInterval: 500, // Reconnect every 500ms
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    poolSize: 10, // Maintain up to 10 socket connections
    useNewUrlParser: true,
  },
}
module.exports = config
