/*
 * @Description: 
 * @Author: sungw
 * @Date: 2019-08-22 13:29:05
 * @LastEditors: sungw
 * @LastEditTime: 2020-03-19 16:05:47
 */

const config = {
	user: "trucker",
	password: "tractorm1m.",
	ip: "172.17.62.114", // 内网
	server: "39.107.226.190", // 公网
	host:  process.env.NODE_ENV === 'production' ? 'localhost':'39.96.217.242',
	database: "Kav",
	port: 2019
};
  module.exports = config