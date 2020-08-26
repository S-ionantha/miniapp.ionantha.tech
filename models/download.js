const axios = require('axios')

const getFile = {
  async download(access_token, media_id) {
    try {
      let res = await axios(
        {
          url: `http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=${access_token}&media_id=${media_id}`,
          responseType: 'arraybuffer'
        }
      )
      console.log(res.data)
      return res.data
    } catch (error) {
      console.error(error)
    }
  },
}
module.exports = getFile