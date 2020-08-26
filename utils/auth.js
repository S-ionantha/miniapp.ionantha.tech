const {appId, appSecret} = require('../conf/wechat')
const { getUserInfo } = require('../models/user')
const { updateItem } = require('../mongo/model/user')
const axios = require('axios')

const auth = {
	/**
	 * 获取授权页面的URL地址
	 * @param {string} backurl
	 */
	getAuthorizeURL (backurl) {
		const redirectUrl = `https://miniapp.ionantha.tech/api/snsapiUserInfo?backurl=${encodeURIComponent(backurl)}`
		const state = '1'
		const scope = 'snsapi_base'
		return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`
		//return client.getAuthorizeURL(redirectUrl, state, scope)
	},
	/**
	 * 根据授权获取到的code，换取access token和openid
	 * @param {string} code
	 */
	async getAccessToken (code) {
		let res = false
		try {
			let axiosRes = await axios.get('https://api.weixin.qq.com/sns/oauth2/access_token', {
				params: {
					appid: appId,
					secret: appSecret,
					code,
					grant_type: 'authorization_code'
				}
			})
			let { errcode, access_token, expires_in, openid} = axiosRes.data
			if(!errcode){
				res = {
					access_token,
					openid
				}		
			}else{
				console.error('获取access_token错误,errcode', errcode)		
			}
		} catch (error) {
			console.error('获取access_token错误', error)	
		}
		return res
	},
	/**
	 * 根据openid，获取用户信息。
	 * @param {String} access_token 
	 * @param {String} openid 
	 */
	async getUser (access_token, openid) {
		let res = false
		try {
			let { data } = await axios.get('https://api.weixin.qq.com/sns/userinfo', {
				params: {
					access_token,
					openid,
					lang: 'zh_CN'
				}
			})
			let { errcode } = data
			if(!errcode){
				await updateItem({
					querySelector: {
						openid
					}, 
					newValue: data
				})
				res = data
			}else{
				console.error('获取微信用户信息错误errcode', errcode)
			}
		} catch (error) {
			console.error('获取微信用户信息错误', error)		
		}
		return res
	},
	/**
	 * 检测当前用户是否已注册
	 * @param {String} openid 
	 */
	async check (openid){
		let userInfo = false
		try {
			userInfo = await getUserInfo({
				openid
			}) 
		} catch (error) {
			console.error('www检测用户库错误', error) 
		}
		return userInfo
	}
}
module.exports = auth
