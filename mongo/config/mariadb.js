const config = {
	user: "trucker",
	password: "tractorm1m.",
	ip: "172.17.40.60", // 内网
	server: "39.96.217.242", // 公网
	host:  process.env.NODE_ENV === 'production' ? 'localhost':'39.96.217.242',
	database: "productdb",
	port: 2019
};
  module.exports = config