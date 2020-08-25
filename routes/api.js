const express = require('express')
const { onSuccess, onError, ERROR } = require('../conf/error')
const { getSignature } = require('../utils/wechat')
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

module.exports = router