let express = require('express');
let router = express.Router();
let fs = require("fs");
const axios = require('axios')
const WebSocket = require('ws');
const { download } = require('../models/download')
const { getToken } = require('../utils/wechat')
let amrToMp3 = require('amrToMp3')
const CryptoJS = require('crypto-js')
var ffmpeg = require('fluent-ffmpeg');


// var parseString = require('xml2js').parseString;
const parser = require("fast-xml-parser");

const webSocketSend = (webSocket, audioData, text) => {
  // audioData = new Float64Array(audioData.buffer)
  // audioData = fs.createReadStream(audioData);
  audioData = [...audioData]
  console.log(audioData.length)
  if (webSocket.readyState !== 1) {
    return
  }
  // let sendAudioData = this.audioData.splice(0, 1280)
  let handlerInterval
  let length = 0
  let params = {
    common: {
      app_id: "5f437bc4",
    },
    business: {
      category: 'read_sentence',
      rstcd: 'utf8',
      group: 'pupil',
      sub: 'ise',
      ent: 'cn_vip',
      tte: 'utf-8',
      cmd: 'ssb',
      auf: 'audio/L16;rate=16000',
      aus: 1,
      aue: 'raw',
      text: '\uFEFF' + text
    },
    data: {
      status: 0,
      encoding: 'raw',
      data_type: 1,
      data: ''
    },
  }
  webSocket.send(JSON.stringify(params))
  handlerInterval = setInterval(() => {
    console.log(length)
    // websocket未连接
    if (webSocket.readyState !== 1) {
      audioData = []
      clearInterval(handlerInterval)
      return
    }
    // 最后一帧
    // if (length > audioData.length) {
    if (audioData.length === 0) {
      console.log("end")
      webSocket.send(
        JSON.stringify({
          business: {
            cmd: 'auw',
            aus: 4,
            aue: 'raw'
          },
          data: {
            status: 2,
            encoding: 'raw',
            data_type: 1,
            data: '',
          },
        })
      )
      audioData = []
      clearInterval(handlerInterval)
      return false
    }
    sendAudioData = audioData.splice(0, 1280)
    // sendAudioData = audioData.slice(length, length + 1280)
    console.log(sendAudioData)
    length = length + 1280
    // 中间帧
    webSocket.send(
      JSON.stringify({
        business: {
          cmd: 'auw',
          aus: 2,
          aue: 'raw'
        },
        data: {
          status: 1,
          encoding: 'raw',
          data_type: 1,
          data: Buffer.from(sendAudioData).toString('base64'),
        },
      })
    )

  }, 40)
}

const config = {
  // 请求地址
  hostUrl: "https://api.xfyun.cn/v1/service/v1/ise",
  host: "api.xfyun.cn",
  //在控制台-我的应用-语音评测获取
  appid: "5f437bc4",
  //在控制台-我的应用-语音评测获取
  apiKey: "8fe1b02cb2b1daeef62114fe0672f1dc",
  uri: "/v1/ise",
  // 音频文件地址
  file: "./public/test.wav",
  // 评测文本
  paper: "wei wei wei"
}

const getXParamStr = () => {
  let xParam = {
    // 音频编码
    "aue": "lame",
    // 结果级别
    "result_level": "simple",
    // 语种
    "language": "en_us",
    // 评测种类
    "category": "read_sentence"
  }
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(xParam)))
}

const getReqHeader = () => {
  let xParamStr = getXParamStr()
  let xCheckSum = CryptoJS.MD5(config.apiKey + ts + xParamStr).toString()
  return {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'X-Appid': config.appid,
    'X-CurTime': ts + "",
    'X-Param': xParamStr,
    'X-CheckSum': xCheckSum
  }
}

router.get("/file_upload", async (req, res) => {
  const { media_id = "jao4c-2p38r", text = '今天天气怎么样' } = req.query

  const access_token = await getToken()
  const data = await download(access_token, media_id)

  fs.writeFileSync(`./public/zhouhp/amr/${media_id}.amr`, data, 'binary')

  amrToMp3(`./public/zhouhp/amr/${media_id}.amr`, [`./public/zhouhp/mp3`]).then((mp3) => {
    console.log(mp3)
    const command = ffmpeg(`./public/zhouhp/mp3/${media_id}.mp3`)
      .outputOptions(
        [
          "-acodec pcm_s16le",
          "-ac 1",
          "-ar 16000"
        ])
      .save(`./public/zhouhp/wav/${media_id}.wav`)
      .on('start', e => {
        console.log('start', e)
      })
      .on('progress', (progress) => {
        console.log('Processing: ' + progress.percent + '% done');
      })
      .on('error', (err, stdout, stderr) => {
        console.log('Cannot process video: ' + err.message);
        res.send({ data: 'error' });
      })
      .on('end', (stdout, stderr) => {
        console.log('Transcoding succeeded !');
        const file = fs.readFileSync(`./public/zhouhp/wav/${media_id}.wav`);

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
        url = encodeURI(`${url}?authorization=${authorization}&date=${date}&host=${host}`)

        let status = 0
        let webSocket = new WebSocket(url)
        let backData
        webSocket.onopen = e => {
          console.log('open', e.data)
          console.log(webSocket.readyState)
          webSocketSend(webSocket, file, text)
          // webSocket.send(JSON.stringify(params))
        }
        webSocket.onmessage = e => {
          console.log('onmessage', e.data)
          console.log(typeof e.data)
          let message = JSON.parse(e.data)
          if (message.data.data) {
            status = 1
            backData = new Buffer(message.data.data, 'base64').toString()
            // backData = fxp.parse(backData)
            backData = parser.parse(backData, {
              attributeNamePrefix: '',
              ignoreAttributes: false
            })
            res.send(backData);
          }
        }
        webSocket.onerror = e => {
          console.log('onerror', e.data)
        }
        webSocket.onclose = e => {
          if (!status) {
            res.send({ data: 'error' });
          }
          console.log('onclose', e.data)
        }
      })

  })
    .catch(function (err) {
      console.log(err)
      res.send({ data: 'error' });
    })

  // const fileData = fs.createReadStream(`./public/zhouhp/mp3/${media_id}.mp3`)
  // let ts = parseInt(new Date().getTime() / 1000)

  // let xParamStr = getXParamStr()
  // let xCheckSum = CryptoJS.MD5(config.apiKey + ts + xParamStr).toString()
  // let buffer = fs.readFileSync(config.file)
  // let newData = await axios({
  //   method: 'post',
  //   url: 'https://api.xfyun.cn/v1/service/v1/ise',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
  //     'X-Appid': config.appid,
  //     'X-CurTime': ts + "",
  //     'X-Param': xParamStr,
  //     'X-CheckSum': xCheckSum
  //   },
  //   body: {
  //     audio: buffer.toString('base64'),
  //     text: config.paper
  //   }

  // })

  // res.send(newData.data)

  // console.log(newData)





  // console.log(file)
  // const encoder = new Lame({
  //   "output": "../public/zhouhp/mp3/demo.mp3",
  //   "bitrate": 192,
  //   // "outSampleRate": 18000,
  // }).setBuffer(file);

  // encoder.encode()
  //   .then((e) => {
  //     console.log(e)
  //     // Encoding finished
  //   })
  //   .catch((error) => {
  //     console.log(error)

  //     // Something went wrong
  //   });





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
  url = encodeURI(`${url}?authorization=${authorization}&date=${date}&host=${host}`)
  let status = 0
  let webSocket = new WebSocket(url)
  webSocket.onopen = e => {
    console.log('open', e.data)
    console.log(webSocket.readyState)
    webSocketSend(webSocket, [])
    // webSocket.send(JSON.stringify(params))
  }
  webSocket.onmessage = e => {
    console.log('onmessage', e.data)
    if (e.data && !status) {
      res.send(e.data);
    }
    status++
    console.log(status)
  }
  webSocket.onerror = e => {
    console.log('onerror', e.data)
  }
  webSocket.onclose = e => {
    console.log('onclose', e.data)
  }
  // res.send(url);
})

module.exports = router;