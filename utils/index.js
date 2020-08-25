/*
 * 工具函数
 * @Author: zhanpeng.zhu
 * @Date: 2018-11-27 20:57:29
 * @Last Modified by: zhanpeng.zhu
 * @Last Modified time: 2019-12-12 10:36:27
 */

const moment = require('moment')
const axios = require('axios')
const { navs: navsList } = require('../models/navs')
const { key, get_poi } = require('../config/tmap')
const { checkItem, getItem, setItem, checkHashItem, getHashItem, setHashItem } = require('./redis')
const crypto = require('crypto')

const { NODE_ENV: ENV } = process.env
const baseUrl = ''
moment.locale('zh-cn')

const util = {
  ENV,
  sensitiveWord(content) {
    return content.replace(
      /GCD|gongchandang|共产党|习近平|李克强|xijinping|中共|傻B|操|鸡巴|逼|阅兵|共铲党|文革|亡国|国家领导人/g,
      $1 => '*'.repeat($1.length)
    )
  },
  // 2位数前面补0
  padStartZero(n) {
    return n.toString().padStart(2, '0')
  },
  /**
   * 抽离文章内容中的图片
   * @param {String} text
   */
  matchArticleImages(text) {
    let images = text.match(/\/\/img(.*?)!/g) || []
    return images
  },
  /**
   * 计算视频时长
   * 格式 HH:MM:ss
   * @param {String} time
   */
  calcVideoTimed(time) {
    time = parseFloat(time)
    let HH = util.padStartZero(Math.trunc(time / 3600))
    let MM = util.padStartZero(Math.trunc(time / 60))
    let ss = util.padStartZero(Math.trunc(time % 60))
    return `${HH}:${MM}:${ss}`
  },
  replaceHTTPS(url) {
    //return url.replace(/http:\/\//g, 'https://').replace(/img(\d?).168trucker.com/g, ($0,$1) => `img${$1}.kacheyizu.cn`)
    return url.replace(/http:\/\/img(\d?).168trucker.com/g, ($0, $1) => `https://img${$1}.kacheyizu.cn`)
  },
  /**
   * 视频请求参数
   * @param {String} videoId
   */
  videoParams(videoId) {
    let stamp = +new Date() + ''
    let resObj = {
      callback: 'videoResolve',
      charge: 0,
      defaultfmt: 'auto',
      otype: 'json',
      guid: '8219e50d644ef0e9da0d5a35006360c4',
      flowid: 'e96ef281aa234b03b184c495e6dbdc85_11001',
      platform: 11001,
      sdtfrom: 'v5010',
      defnpayver: 0,
      appVer: '3.3.555',
      host: 'm.v.qq.com',
      ehost: `https://m.v.qq.com/page/q/l/r/${videoId}.html`,
      refer: 'm.v.qq.com',
      sphttps: 1,
      sphls: '',
      _rnd: parseInt(stamp.substr(0, 10)),
      spwm: 4,
      vid: videoId,
      defn: 'auto',
      fhdswitch: '',
      show1080p: false,
      dtype: 1,
      clip: 4,
      defnsrc: '',
      fmt: 'auto',
      defsrc: 1,
      _qv_rmt: 'j9eVkvvOA14004DqO=',
      _qv_rmt2: 'toev04kS154805lWQ=',
    }
    resObj[`_${stamp}`] = ''
    return resObj
  },
  async singleRedisHandle(obj, resData = {}) {
    let { key, getDataFunction, argument } = obj
    try {
      let status = await checkItem(key)
      if (!status) {
        resData = await getDataFunction(argument)
        setItem(key, resData)
      } else {
        resData = await getItem(key)
      }
    } catch (error) {
      console.error('redis错误', error)
    }
    return resData
  },
  async hashRedisHandle(obj, refresh, resData = {}) {
    let { table, key, getDataFunction, argument } = obj
    try {
      let status = await checkHashItem({
        table,
        key,
      })
      if (refresh || !status) {
        resData = await getDataFunction(argument)
        setHashItem({
          table,
          key,
          value: resData,
        })
      } else {
        resData = await getHashItem({
          table,
          key,
        })
      }
    } catch (error) {
      console.error('redis错误', error)
    }
    return resData
  },
  toAuth(req, res) {
    let redirectUrl = `${baseUrl}/auth?backurl=${baseUrl + req.originalUrl}`
    res.redirect(redirectUrl)
  },
  /**
   * 成功
   * @param {Array} data
   */
  onSuccess(data) {
    return {
      status: 0,
      data,
    }
  },
  /**
   * 服务异常错误
   * @param {String} errMsg
   */
  onError(errMsg = '服务异常，请稍后重试') {
    return {
      status: 0,
      errCode: 500,
      errMsg,
    }
  },
  /**
   * 组合导航
   * @param {Number} n
   */
  spliceNavs(n) {
    n = n || 0
    let navs = navsList.map((item, index) => {
      let { href, name } = item
      return {
        title:name,
        url: href.indexOf('https://') >= 0 ? href : `${baseUrl + href}`,
        selected: n == index ? 1 : 0,
      }
    })
    return navs
  },
  /**
   * 时间戳合成，用于mssql中的时间戳字段
   * @param {String} stampString
   */
  stampHandle(stampString) {
    return parseInt(stampString + '000')
  },
  formateDate(ts) {
    if (moment().year() == moment(ts).year()) {
      return moment(ts).format('MM-DD HH:mm')
    } else {
      return moment(ts).format('YYYY-MM-DD HH:mm')
    }
  },

  /**
   * 检查是否在2天内发布
   * @param {Number} releasedtime
   */
  checkPublishDate(releasedtime, stamp = +new Date()) {
    return stamp - releasedtime <= 864e5 ? 1 : 0
  },

  /**
   * 日期计算
   * @param {Number} stamp
   */
  dateFromNow(stamp, date = '') {
    if (util.checkPublishDate(stamp)) {
      date = moment(stamp)
        .endOf('hour')
        .fromNow()
    } else {
      date = moment(stamp).format('YYYY-MM-DD')
    }
    return date
  },

  setCookie(res, key, value, expires = 2592e5) {
    try {
      return res.cookie(key, value, {
        domain: '.168trucker.com',
        path: '/',
        expires: new Date(Date.now() + expires),
        httpOnly: false,
      })
    } catch (error) {
      console.error('写入cookie错误', error)
    }
  },

  /**
   * 剪接首页焦点图数据
   * @param {Array} data
   */
  spliceFocusList(data) {
    let resData = data.map(item => {
      let { arid, title, coverimg: figure, dtRelease, hrefurl } = item
      return {
        link: arid ? `${baseUrl}/news/${util.stampHandle(dtRelease)}/${arid}.html` : hrefurl,
        figure: util.replaceHTTPS(figure),
        title,
      }
    })
    return resData
  },

  /**
   * 剪接专栏数据
   * @param {Array} data
   */
  spliceZhuanlanList(data) {
    let resData = data.map(item => {
      let { type, title, avatar: figure, intro: subtitle, categoryid: id } = item
      return {
        id,
        type,
        link: `${baseUrl}/zhuanlan/${type == 1 ? 'article' : 'video'}/${id}.html`,
        figure,
        title,
        subtitle,
      }
    })
    return resData
  },

  /**
   * 计算等级
   * @param {Number} score
   */
  calcLevel(score) {},

  /**
   * 剪接文章列表数据并置顶头条
   * @param {Array} data
   * @param {Number} topId
   */
  spliceArticleList(data = [], topId) {
    let resData = data.length
      ? data.map(item => {
          let {
            id,
            title,
            showtype,
            coverimg: figure,
            classification1: category,
            releasedtime,
            comment: comments,
            viewcount,
          } = item
          let stamp = util.stampHandle(releasedtime)
          let topObject = {
            stamp: 9e13,
            top: 1,
          }
          // picturesTotal
          let resObject = {
            id,
            showtype,
            category,
            link: `${baseUrl}/news/${releasedtime}/${id}.html`,
            figure: util.replaceHTTPS(figure),
            title,
            comments,
            date: util.dateFromNow(stamp),
            tag: '',
            stamp,
          }
          id == topId && Object.assign(resObject, topObject)

          return resObject
        })
      : data
    return resData
  },
  /**
   * 剪接专题列表数据
   * @param {Array} data
   */
  spliceTopicList(data = []) {
    let resData = data.length
      ? data.map(item => {
          let {
            _id: id,
            type,
            platform,
            title,
            desc,
            keywords,
            wechat,
            top,
            showStatus,
            recommend,
            clickTotal,
            likeTotal,
            viewTotal,
            linkUrl,
            figure,
            stamp,
            startDate,
            endDate,
          } = item
          return {
            id,
            type,
            platform,
            desc,
            keywords,
            title,
            figure: util.replaceHTTPS(figure),
            wechat,
            top,
            showStatus,
            recommend,
            clickTotal,
            likeTotal,
            viewTotal,
            linkUrl,
            stamp,
            startDate,
            endDate,
          }
        })
      : data
    return resData
  },

  /**
   * 剪接视频列表数据
   * @param {Array} data
   */
  spliceVideoList(data = []) {
    let resData = data.length
      ? data.map(item => {
          let {
            id,
            vtitle: title,
            vcoverimg: figure,
            vaddress,
            vsource: platform,
            time = '00:01:59',
            releasedtime,
            viewcount: playTotal,
          } = item
          let stamp = util.stampHandle(releasedtime)
          return {
            id,
            link: `${baseUrl}/video/${releasedtime}/${id}.html`,
            figure: util.replaceHTTPS(figure),
            title,
            vaddress,
            playTotal,
            platform,
            date: util.dateFromNow(stamp),
            stamp,
            time,
          }
        })
      : data
    return resData
  },

  /**
   * 剪接评论列表数据
   * @param {Array} data
   */
  sortCommentsData(data) {
    return data.sort((a, b) => b.content.length - a.content.length)
  },

  /**
   * 按时间戳顺序2次排序
   * @param {Array} data
   */
  sortListData(data = []) {
    let sortedData = []
    if (data.length) {
      sortedData = data.sort((a, b) => {
        return b.stamp - a.stamp
      })
    }
    return sortedData
  },

  /**
   * 过滤视频数据
   * @param {Array} data
   * @param {Number} stamp
   */
  filterVideoData(data, stamp) {
    let filteredData = data.filter(item => util.checkPublishDate(util.stampHandle(item.releasedtime), stamp))
    return filteredData
  },
  /**
   * 过滤富文本
   * @param {*} text
   */
  richText(text) {
    return text.replace(/<p><strong>(.*?)<\/strong>(<br\/>)?<\/p>/g, ($0, $1) => {
      return $1.indexOf('<strong>') >= 0 ? $0 : `<h3>${$1}</h3>`
    })
  },
  /**
   * 解析文章数据
   * @param {Object} articleData
   */
  resolveArticle(articleData) {
    let {
      id,
      title,
      tags: keywords,
      videocode,
      coverimg: sharePiture,
      qw_text: description,
      isOriginal: copyright,
      artext: content,
      originalname: author,
      author: editor,
      releasedtime: date,
      originalsource: source,
      comment,
      viewcount: viewTotal,
      likescount: like,
      sharescount,
    } = articleData

    return {
      id,
      title,
      keywords,
      videocode,
      description,
      sharePiture: util.replaceHTTPS(sharePiture),
      copyright: copyright,
      content: util.richText(util.replaceHTTPS(content)),
      author,
      editor,
      date: util.dateFromNow(util.stampHandle(date)),
      source,
      comment,
      viewTotal,
      images: util.matchArticleImages(content),
      like,
      link: `${baseUrl}/news/${date}/${id}.html`,
      sharescount,
    }
  },
  /**
   * 解析图集新闻
   * @param {Array} data
   */
  resolvePictures(data) {
    return data.map(item => {
      let { imgsort, imgsrc, imgdes } = item
      return {
        position: imgsort,
        src: `${imgsrc}!690`,
        title: imgdes,
      }
    })
  },

  /**
   * 随机标签
   * @param {String} tags
   */
  randomTag(tags) {
    tags = tags.split(',')[0]
    return tags[Math.floor(Math.random() * tags.length)]
  },

  /**
   * 解析视频数据
   * @param {Object} videoData
   */
  resolveVideo(videoData) {
    let {
      id,
      vtitle: title,
      tags: keywords,
      vaddress: videocode,
      vcoverimg: sharePiture,
      qw_text: description,
      editor: editor,
      releasedtime: date,
      comment,
      viewcount: viewTotal,
      likescount: like,
      vsource: platform,
      time,
      sharescount,
    } = videoData

    return {
      id,
      title,
      keywords,
      videocode,
      description,
      sharePiture: util.replaceHTTPS(sharePiture),
      editor,
      date: util.dateFromNow(util.stampHandle(date)),
      comment,
      viewTotal,
      like,
      platform,
      time,
      link: `${baseUrl}/video/${date}/${id}.html`,
      sharescount,
    }
  },
  async geolocation(latitude, longitude) {
    let resAddress = ''
    let resData = await axios.get('https://apis.map.qq.com/ws/geocoder/v1/', {
      params: {
        location: `${latitude},${longitude}`,
        get_poi,
        key,
      },
    })
    let { status, message, result } = resData.data
    if (!status) {
      let { address } = result
      resAddress = address
    }
    return resAddress
  },
  /**
   * 获取视频播放源，poster图片，播放时长
   * @param {String} vid
   */
  async getVideoSource(vid) {
    let params = util.videoParams(vid)
    let { sdtfrom, guid } = params
    try {
      let videoData = await axios.get('https://h5vv.video.qq.com/getinfo', {
        params,
        headers: {
          userAgent:
            'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Mobile Safari/537.36',
        },
      })
      let { data } = videoData
      data = JSON.parse(data.substr(0, data.length - 1).replace(/videoResolve\(/, ''))
      let { fn: name, td: time, fvkey: vkey, ul } = data.vl.vi[0]
      let { url } = ul.ui[0]
      time = util.calcVideoTimed(time)
      return {
        videocover: `http://puui.qpic.cn/qqvideo_ori/0/${vid}_496_280/0`,
        videocode: `${url}${name}?sdtfrom=${sdtfrom}&guid=${guid}&vkey=${vkey}&platform=2`,
        time,
      }
    } catch (error) {
      console.error('获取视频错误', error)
    }
  },
  md5(key) {
    let hash = crypto.createHash('md5')
    return hash
      .update(key)
      .digest('hex')
      .toUpperCase()
  },
}

module.exports = util
