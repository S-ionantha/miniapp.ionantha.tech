/*
 * @Author: your name
 * @Date: 2020-04-27 10:31:33
 * @LastEditTime: 2020-04-27 17:14:26
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /privateCloud/config/mariadb_mall.js
 */

const config = {
	user: "trucker",
	password: "tractorm1m.",
	ip: "172.17.62.114", // 内网
	server: "39.107.226.190", // 公网
	host:  "localhost",
	database: "mall",
	port: process.env.NODE_ENV =="production" ? 2019:3306
}
module.exports = config