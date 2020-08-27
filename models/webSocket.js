const axios = require('axios')

webSocketSend() {
  if (this.webSocket.readyState !== 1) {
    return
  }
  let audioData = this.audioData.splice(0, 1280)
  var params = {
    common: {
      app_id: this.appId,
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
      aue: 'raw',
      text: '\uFEFF' + ($('.start-taste-left .ipt').val() || '今天天气怎么样')
    },
    data: {
      status: 0,
      encoding: 'raw',
      data_type: 1,
      data: ''
    },
  }
  this.webSocket.send(JSON.stringify(params))
  this.handlerInterval = setInterval(() => {
    // websocket未连接
    if (this.webSocket.readyState !== 1) {
      this.audioData = []
      clearInterval(this.handlerInterval)
      return
    }
    // 最后一帧
    if (this.audioData.length === 0) {
      if (this.status === 'end') {
        this.webSocket.send(
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
        this.audioData = []
        clearInterval(this.handlerInterval)
      }
      return false
    }
    audioData = this.audioData.splice(0, 1280)
    // 中间帧
    this.webSocket.send(
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
          data: this.toBase64(audioData),
        },
      })
    )
  }, 40)
}