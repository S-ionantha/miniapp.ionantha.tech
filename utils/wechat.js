const { appId, appSecret} = require('../conf/wechat')
const {checkItemNoFix:checkItem, getItemNoFix:getItem, setItemNoFix:setItem} = require('../utils/redis')
const jsSHA = require('jssha')
const axios = require('axios')

const weChat = {
  async getToken (){
    try {
      let token = null
      let tokenStatus = await checkItem('access_token')
      if(!tokenStatus){
        let res = await axios.get('https://api.weixin.qq.com/cgi-bin/token', {
          params: {
            grant_type: 'client_credential',
            appid: appId,
            secret: appSecret
          }
        })
        let { access_token, expires_in} = res.data
        token = access_token
        await setItem('access_token', {access_token}, expires_in)
      }else{
        token = await getItem('access_token')
        token = token.access_token
      }
      return token
    } catch (error) {
      console.error(error)   
    }
  },

  // async getAccessToken (code) {
	// 	let res = false
	// 	try {
	// 		let axiosRes = await axios.get('https://api.weixin.qq.com/cgi-bin/token', {
	// 			params: {
	// 				appid: appId,
	// 				secret: appSecret,
	// 				grant_type: 'client_credential'
	// 			}
	// 		})
	// 		let { errcode, access_token, expires_in, openid} = axiosRes.data
	// 		if(!errcode){
	// 			res = {
	// 				access_token,
	// 				openid
	// 			}		
	// 		}else{
	// 			console.error('获取access_token错误,errcode', errcode)		
	// 		}
	// 	} catch (error) {
	// 		console.error('获取access_token错误', error)	
	// 	}
	// 	return res
  // },
  
  async getTicket (){
    try {
      let wxTicket = null;
      let ticketStatus = await checkItem('wxTicket')
      let token = await weChat.getToken()
      if(!ticketStatus){
        let res = await axios.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket', {
          params: {
            access_token: token,
            type: 'jsapi'
          }   
        })
        let { ticket, expires_in} = res.data
        wxTicket = ticket
        await setItem('wxTicket', {ticket}, expires_in)
      }else{
        wxTicket = await getItem('wxTicket')
        wxTicket = wxTicket.ticket
      }
      return wxTicket
    } catch (error) {
      console.error('获取票据错误', error) 
    }
  },
  createNonceStr (){
    return Math.random().toString(36).substring(2, 13)
  },
  createTimeStamp (){
    return (+new Date() + '').substring(0, 10)
  },
  async calcSignature (url){
    try {
      let ticket = await weChat.getTicket()
      let nonceStr = weChat.createNonceStr()
      let timestamp = weChat.createTimeStamp()

      let signString = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`
      
      let shaObj = new jsSHA('SHA-1', 'TEXT')
      shaObj.update(signString)
      return {
        appId,
        nonceStr,
        timestamp,
        signature: shaObj.getHash('HEX')
      }
    } catch (error) {
      console.error('计算签名出错', error) 
    }
  },
  async getSignature (url){
    try {
      let signature = await weChat.calcSignature(url)
      return signature
    } catch (error) {
      console.error('生成最终签名是错误',error)   
    }
  }
}

module.exports = weChat