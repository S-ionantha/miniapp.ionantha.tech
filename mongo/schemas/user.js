/**
 * MongoDB
 * 用户列表
 */
module.exports = {
	tablename: "user",
	fileds: {
		openid_temp: {
			type: String,
			index: true,
			default: ""
		},
		openid_www: {
			type: String,
			index: true,
			default: ""
		},
		openid: {
			type: String,
			index: true,
			default: ""
		},
		bususer: {
			type: Number,
			index: true,
			default: 0,
		},
		nickname: {
			type: String,
			index: true,
			default: "e族卡友"
		},
		realname: {
			type: String,
			default: ""
		},
		headimgurl: String,
		phone: {
			type: String,
			index: true,
			default: ""
		},
		sex: {
			type: Number,
			index: true,
			default: 1
		},
		province: {
			type: String,
			index: true
		},
		city: {
			type: String,
			index: true
		},
		country: {
			type: String,
			default: "China"
		},
		unionid: {
			type: String,
			index: true,
			default: ""
		},
		qqid: {
			type: String,
			index: true,
			default: ""
		},
		address: String,
		model: {
			type: Number,
			index: true
		},
		vip: {
			type: Number,
			index: true,
			default: 0
		},
		WXxcx: {
			type: String,
			index: true,
			default: ''
		},
		BDxcx: {
			type: String,
			index: true,
			default: ''
		},
		TTxcx: {
			type: String,
			index: true,
			default: ''
    },
    virtualGroupId: {
			type: "ObjectId",
		},
	},
	order: {
		updatedAt: -1
	}
};