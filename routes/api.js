const express = require('express')
const { onSuccess, onError, ERROR } = require('../conf/error')
const { getSignature, getToken } = require('../utils/wechat')
const { getAccessToken, getUser, check } = require('../utils/auth')
const router = express.Router()

router.post('/getSignature', async (req, res) => {
  let { url } = req.body
  try {
    let data = await getSignature(url)
    res.send(onSuccess(data))
  } catch (error) {
    console.log(error)
    res.status(500).send(ERROR.SERVER)
  }
})

router.get('/getAccessToken',  async (req, res) => {
  try {
    let data = await getToken()
    res.send(onSuccess(data))
  } catch (error) {
    console.log(error)
    res.status(500).send(ERROR.SERVER)
  }
})

router.get('/snsapiUserInfo', async (req, res) => {
  const { code, backurl = 'http://' + process.env.DOMAIN } = req.query
  if (!code) {
    return res.send(ERROR.PARAM)
  }
  try {
    let { access_token, openid } = await getAccessToken(code)
    if (access_token && openid) {
      //	let userInfo = await check(openid)
      //console.log(userInfo, '20090412获取到的用户信息')
      //if(!userInfo){
      await getUser(access_token, openid)
      let userInfo = await check(openid)
      //}
      let { id: userid, headimgurl: avatar, nickname: nickname } = userInfo
      if (userid) {
        setCookie(res, 'userid', userid)
        setCookie(res, 'avatar', avatar)
        setCookie(res, 'nickname', nickname)
      }
    }
    res.redirect(backurl)
  } catch (error) {
    console.error('授权错误', error)
    res.status(500).send(ERROR.SERVER)
  }
})

module.exports = router