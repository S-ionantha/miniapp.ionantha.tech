/*
 * @Description: 
 * @Author: sungw
 * @Date: 2019-11-11 14:09:00
 * @LastEditors: sungw
 * @LastEditTime: 2019-11-13 14:08:25
 */

const config = {
	user: "dealer",
	password: "dealerm1m.",
	ip: "172.17.40.60", // 内网
	server: "139.96.217.242", // 公网
	host:  process.env.NODE_ENV === 'production' ? 'localhost':'192.168.0.33',
	database: "dealer",
	port: 2019
};
  module.exports = config