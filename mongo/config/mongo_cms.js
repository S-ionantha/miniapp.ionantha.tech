const config = {
	ip: '172.17.62.115', // 内网
	server: '39.107.92.154', // 公网
	host:  process.env.NODE_ENV === 'production' ? 'localhost':'39.96.217.242',
	port: process.env.NODE_ENV === 'production' ? '27017':'27017',
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
