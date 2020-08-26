const config = {
	ip: '172.17.40.60', // 内网
	server: '39.96.217.242', // 公网
	host: '39.96.217.242',
	port: '27017',
	username: "trucker",
	password: "tractorm1m.",
	database: "Kav",
	options: {
		reconnectInterval: 500, // Reconnect every 500ms
		reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
		poolSize: 10, // Maintain up to 10 socket connections
		useNewUrlParser: true
	}
}
module.exports = config
