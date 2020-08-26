let express = require('express');
let router = express.Router();
let fs = require("fs");
const WebSocket = require('ws');
const { download } = require('../models/download')
const { getToken } = require('../utils/wechat')
let amrToMp3 = require('amrToMp3')
const CryptoJS = require('crypto-js')


router.get("/file_upload", async (req, res) => {
  const { media_id } = req.query
  const access_token = await getToken()
  console.log(access_token)
  const data = await download(access_token, media_id)
  console.log(data)
  fs.writeFileSync(`./public/zhouhp/amr/${media_id}.amr`, data, 'binary')
  amrToMp3(`./public/zhouhp/amr/${media_id}.amr`, [`./public/zhouhp/mp3`])
  res.send({});
})

router.get('/', async (req, res) => {
  let url = 'wss://ise-api.xfyun.cn/v2/open-ise'
  let host = 'ise-api.xfyun.cn'
  let apiKey = '8fe1b02cb2b1daeef62114fe0672f1dc'
  let apiSecret = '4d1149480a8fcc088d603c671e55119c'
  let date = new Date().toGMTString()
  let algorithm = 'hmac-sha256'
  let headers = 'host date request-line'
  let signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2/open-ise HTTP/1.1`
  let signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret)
  let signature = CryptoJS.enc.Base64.stringify(signatureSha)
  let authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
  let authorization = Buffer.from(authorizationOrigin).toString('base64') 
  url = `${url}?authorization=${authorization}&date=${date}&host=${host}`

  let webSocket = new WebSocket(url)
  webSocket.onopen = e => {
    console.log('open')
    // this.setStatus('ing')
    // 重新开始录音
    // setTimeout(() => {
    //   this.webSocketSend()
    // }, 500)
  }
  webSocket.onmessage = e => {
    this.result(e.data)
  }
  webSocket.onerror = e => {
    this.recorderStop()
  }
  webSocket.onclose = e => {
    this.recorderStop()
  }
  var params = {
    common: {
      app_id: "5f437bc4",
    },
    business: {
      category: 'read_sentence', // read_syllable/单字朗读，汉语专有 read_word/词语朗读  read_sentence/句子朗读 http://test.www.xfyun.cn/doc/Ise/IseAPI.html#%E6%8E%A5%E5%8F%A3%E8%B0%83%E7%94%A8%E6%B5%81%E7%A8%8B
      rstcd: 'utf8',
      group: 'pupil',
      sub: 'ise',
      ent: 'cn_vip',
      tte: 'utf-8',
      cmd: 'ssb',
      auf: 'audio/L16;rate=16000',
      aus: 1,
      aue: 'lame:mp3',
      text: '\uFEFF' + '今天天气怎么样'
    },
    data: {
      status: 0,
      // encoding: 'raw',
      // data_type: 1,
      data: ''
    },
  }
  webSocket.send(JSON.stringify(params))
  // webSocket.send(
  //   JSON.stringify({
  //     business: {
  //       cmd: 'auw',
  //       aus: 2,
  //       aue: 'raw'
  //     },
  //     data: {
  //       status: 1,
  //       encoding: 'raw',
  //       data_type: 1,
  //       data: this.toBase64(audioData),
  //     },
  //   })
  // )
  res.send(url);
})

module.exports = router;