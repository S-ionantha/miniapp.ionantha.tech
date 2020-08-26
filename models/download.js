const axios = require('axios')

const getFile = {
  async download(access_token, media_id) {
    try {
      let res = await axios.get('http://file.api.weixin.qq.com/cgi-bin/media/get', {
        params: {
          access_token,
          media_id,
        }
      })
      console.log(res.data)
      return res.data
    } catch (error) {
      console.error(error)
    }
  },
}
module.exports = getFile