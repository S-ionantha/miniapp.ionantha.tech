/*
 * @Description: 
 * @Author: ionantha
 * @Date: 2019-08-21 15:56:39
 * @LastEditors: sungw
 * @LastEditTime: 2020-04-13 13:41:32
 */
const config = {
	ip: '172.17.62.115', // 内网
	server: '39.107.92.154', // 公网
	host:  process.env.NODE_ENV === 'production'?'localhost':"192.168.0.33" ,
	port:'38128' ,
	username: "trucker",
	password: "tractorm1m.",
	database: "topic",
	options: {
		reconnectInterval: 500, // Reconnect every 500ms
		reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
		poolSize: 10, // Maintain up to 10 socket connections
		useNewUrlParser: true
	}
}
module.exports = config
