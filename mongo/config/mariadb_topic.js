/*
 * @Description: 
 * @Author: sungw
 * @Date: 2019-08-22 13:29:05
 * @LastEditors: sungw
 * @LastEditTime: 2019-09-16 09:44:23
 */

const config = {
	user: "trucker",
	password: "tractorm1m.",
	ip: "172.21.0.8", // 内网
	server: "139.199.128.133", // 公网
	host:  process.env.NODE_ENV === 'production' ? '139.199.128.133':'47.102.116.125',
	database: "Kav",
	port: process.env.NODE_ENV === 'production' ? '2019':'3306'
};
  module.exports = config