/**
 * Created by Jeffery Wang.
 * Create Time: 2015-06-16 19:52
 * Author Link: http://blog.wangjunfeng.com
 */
var Base64 = {
  _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
  encode: function (a) {
    var b,
      c,
      d,
      e,
      f,
      g,
      h,
      i = '',
      j = 0
    for (a = Base64._utf8_encode(a); j < a.length; )
      (b = a.charCodeAt(j++)),
        (c = a.charCodeAt(j++)),
        (d = a.charCodeAt(j++)),
        (e = b >> 2),
        (f = ((3 & b) << 4) | (c >> 4)),
        (g = ((15 & c) << 2) | (d >> 6)),
        (h = 63 & d),
        isNaN(c) ? (g = h = 64) : isNaN(d) && (h = 64),
        (i =
          i +
          this._keyStr.charAt(e) +
          this._keyStr.charAt(f) +
          this._keyStr.charAt(g) +
          this._keyStr.charAt(h))
    return i
  },
  decode: function (a) {
    var b,
      c,
      d,
      e,
      f,
      g,
      h,
      i = '',
      j = 0
    for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ''); j < a.length; )
      (e = this._keyStr.indexOf(a.charAt(j++))),
        (f = this._keyStr.indexOf(a.charAt(j++))),
        (g = this._keyStr.indexOf(a.charAt(j++))),
        (h = this._keyStr.indexOf(a.charAt(j++))),
        (b = (e << 2) | (f >> 4)),
        (c = ((15 & f) << 4) | (g >> 2)),
        (d = ((3 & g) << 6) | h),
        (i += String.fromCharCode(b)),
        64 != g && (i += String.fromCharCode(c)),
        64 != h && (i += String.fromCharCode(d))
    return (i = Base64._utf8_decode(i))
  },
  _utf8_encode: function (a) {
    a = a.replace(/\r\n/g, '\n')
    for (var b = '', c = 0; c < a.length; c++) {
      var d = a.charCodeAt(c)
      128 > d
        ? (b += String.fromCharCode(d))
        : d > 127 && 2048 > d
        ? ((b += String.fromCharCode((d >> 6) | 192)),
          (b += String.fromCharCode((63 & d) | 128)))
        : ((b += String.fromCharCode((d >> 12) | 224)),
          (b += String.fromCharCode(((d >> 6) & 63) | 128)),
          (b += String.fromCharCode((63 & d) | 128)))
    }
    return b
  },
  _utf8_decode: function (a) {
    for (var b = '', c = 0, d = (c1 = c2 = 0); c < a.length; )
      (d = a.charCodeAt(c)),
        128 > d
          ? ((b += String.fromCharCode(d)), c++)
          : d > 191 && 224 > d
          ? ((c2 = a.charCodeAt(c + 1)),
            (b += String.fromCharCode(((31 & d) << 6) | (63 & c2))),
            (c += 2))
          : ((c2 = a.charCodeAt(c + 1)),
            (c3 = a.charCodeAt(c + 2)),
            (b += String.fromCharCode(
              ((15 & d) << 12) | ((63 & c2) << 6) | (63 & c3)
            )),
            (c += 3))
    return b
  },
}
var nativeShare = function (elementNode, config) {
  if (!document.getElementById(elementNode)) {
    return false
  }
  var qApiSrc = {
    lower: 'https://3gimg.qq.com/html5/js/qb.js',
    higher: 'https://jsapi.qq.com/get?api=app.share',
  }
  var bLevel = {
    qq: { forbid: 0, lower: 1, higher: 2 },
    uc: { forbid: 0, allow: 1 },
  }
  var UA = navigator.appVersion
  var isqqBrowser =
    UA.split('MQQBrowser/').length > 1 ? bLevel.qq.higher : bLevel.qq.forbid
  var isucBrowser =
    UA.split('UCBrowser/').length > 1 ? bLevel.uc.allow : bLevel.uc.forbid
  var version = {
    uc: '',
    qq: '',
  }
  var isWeixin = false
  config = config || {}
  this.elementNode = elementNode
  this.url = window.config.url || document.location.href || ''
  this.title = window.config.title || document.title || ''
  this.desc = window.config.desc || document.title || ''
  this.img =
    window.config.img ||
    (document.getElementsByTagName('img').length > 0 &&
      document.getElementsByTagName('img')[0].src) ||
    ''
  this.img_title = config.img_title || document.title || ''
  this.from = config.from || window.location.host || ''
  this.ucAppList = {
    sinaWeibo: ['kSinaWeibo', 'SinaWeibo', 11, '新浪微博'],
    weixin: ['kWeixin', 'WechatFriends', 1, '微信好友'],
    weixinFriend: ['kWeixinFriend', 'WechatTimeline', '8', '微信朋友圈'],
    QQ: ['kQQ', 'QQ', '4', 'QQ好友'],
    QZone: ['kQZone', 'QZone', '3', 'QQ空间'],
  }
  this.share = function (to_app) {
    if (typeof goldlog != 'undefined') {
      goldlog.record('/web.1.4', '', 'shareid=' + to_app, '')
    }
    var title = window.config.title,
      url = window.config.url,
      desc = window.config.desc,
      img = window.config.img,
      img_title = this.img_title,
      from = this.from
    if (isucBrowser) {
      to_app =
        to_app == ''
          ? ''
          : platform_os == 'iPhone'
          ? this.ucAppList[to_app][0]
          : this.ucAppList[to_app][1]
      if (to_app == 'QZone') {
        //qq空间
        B =
          'mqqapi://share/to_qzone?src_type=web&version=1&file_type=news&req_type=1&image_url=' +
          img +
          '&title=' +
          title +
          '&description=' +
          desc +
          '&url=' +
          url +
          '&app_name=' +
          from
        ;(k = document.createElement('div')),
          (k.style.visibility = 'hidden'),
          (k.innerHTML =
            '<iframe src="' +
            B +
            '" scrolling="no" width="1" height="1"></iframe>'),
          document.body.appendChild(k),
          setTimeout(function () {
            k && k.parentNode && k.parentNode.removeChild(k)
          }, 5e3)
      }
      if (typeof window.ucweb != 'undefined') {
        window.ucweb.startRequest('shell.page_share', [
          title,
          desc,
          url,
          to_app,
          '',
          '@' + from,
          '',
        ])
      } else {
        if (typeof window.ucbrowser != 'undefined') {
          window.ucbrowser.web_share(
            title,
            desc,
            url,
            to_app,
            '',
            '@' + from,
            ''
          )
        } else {
        }
      }
    } else {
      if (isqqBrowser && !isWeixin) {
        to_app = to_app == '' ? '' : this.ucAppList[to_app][2]
        var timestamp = new Date().getTime()
        if (url.indexOf('?') != -1) {
          url = url + '&timestamp=' + timestamp
        } else {
          url = url + '?timestamp=' + timestamp
        }
        var ah = {
          url: window.config.url,
          title: window.config.title,
          description: window.config.desc,
          img_url: window.config.img,
          img_title: img_title,
          to_app: to_app, //微信好友1,腾讯微博2,QQ空间3,QQ好友4,生成二维码7,微信朋友圈8,啾啾分享9,复制网址10,分享到微博11,创意分享13
          cus_txt: title + '@\u624b\u673a\u592e\u89c6\u7f51',
        }
        ah = to_app == '' ? '' : ah
        if (typeof window.browser != 'undefined') {
          if (
            typeof window.browser.app != 'undefined' &&
            isqqBrowser == bLevel.qq.higher
          ) {
            window.browser.app.share(ah)
          }
        } else {
          if (window.browser) {
            window.browser.app && window.browser.app.share(ah)
          } else {
          }
        }
      } else {
      }
    }
  }

  this.html = function () {
    var position = document.getElementById(this.elementNode)
    if (this.elementNode == 'nativeShare') {
      var str = '<span>分享：</span>'
      for (var i = 0; i < shareData1.length; i++) {
        str +=
          '<a data-app="' +
          shareData1[i].dataapp +
          '" class="' +
          shareData1[i].className +
          '"></a>'
      }

      var html = str
      position.innerHTML = html
    } else if (this.elementNode == 'nativeShareArt') {
      var str = '分享至：<ul>'
      for (var i = 0; i < shareData.length; i++) {
        str +=
          '<li><a data-app="' +
          shareData[i].dataapp +
          '" class="' +
          shareData[i].className +
          '"><div class="img"><img src="' +
          shareData[i].img +
          '"></div></a></li>'
      }
      str += '<div class="clear"></div></ul>'
      var html = str
      position.innerHTML = html
    } else {
      var str = '<ul>'
      for (var i = 0; i < shareData.length; i++) {
        str +=
          '<li><a data-app="' +
          shareData[i].dataapp +
          '" class="' +
          shareData[i].className +
          '"><div class="img"><img src="' +
          shareData[i].img +
          '"></div><p>' +
          shareData[i].text +
          '</p></a></li>'
      }
      str += '<div class="clear"></div></ul>'
      var html = str
      position.innerHTML = html
    }
  }

  this.isloadqqApi = function () {
    if (isqqBrowser) {
      var b = version.qq < 5.4 ? qApiSrc.lower : qApiSrc.higher
      var d = document.createElement('script')
      var a = document.getElementsByTagName('body')[0]
      d.setAttribute('src', b)
      a.appendChild(d)
    }
  }

  this.getPlantform = function () {
    ua = navigator.userAgent
    if (ua.indexOf('iPhone') > -1 || ua.indexOf('iPod') > -1) {
      return 'iPhone'
    } else if (ua.indexOf('iPad') > -1) {
      return 'iPad'
    } else {
      return 'Android'
    }
  }

  this.is_weixin = function () {
    var a = UA.toLowerCase()
    if (a.match(/MicroMessenger/i) == 'micromessenger') {
      return true
    } else {
      return false
    }
  }

  this.getVersion = function (c) {
    var a = c.split('.'),
      b = parseFloat(a[0] + '.' + a[1])
    return b
  }

  this.pcShare = function (to_app) {
    if (typeof goldlog != 'undefined') {
      goldlog.record('/web.1.4', '', 'shareid=' + to_app, '')
    }
    var http = '' //原来是window.location后来改成了this.url
    switch (to_app) {
      case 'sinaWeibo': {
        http =
          'https://v.t.sina.com.cn/share/share.php?url=' +
          encodeURIComponent(document.location.protocol + '//' + window.config.url.split('//')[1]) +
          '&appkey=2078561600&title=' +
          window.config.title +
          '&pic=' +
          window.config.img +
          '&language=zh_cn'
        return http
        break
      }
      case 'tx_weibo': {
        http =
          'https://v.t.qq.com/share/share.php?pic=' +
          window.config.img +
          '&content=' +
          window.configis.desc +
          '&url=' +
          encodeURIComponent(window.config.url) +
          '&title=' +
          window.config.title
        return http
        break
      }
      case 'QZone': {
        var aa = new Date().getTime()
        http =
          'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?pics=' +
          window.config.img +
          '&summary=' +
          window.config.desc +
          '&url=' +
          encodeURIComponent(document.location.protocol + '//' + window.config.url.split('//')[1]) +
          '?' +
          aa +
          '&title=' +
          window.config.title
        return http
        break
      }
      default:
        return null
    }
  }
  this.b0926 = function (a, b) {
    var c, d, e
    for (d in b)
      (e = b[d]),
        (c = new RegExp('(' + d + '=)[^&]+', 'i')),
        a.match(c)
          ? (a = a.replace(c, '$1' + e))
          : (a += -1 === a.indexOf('?') ? '?' + d + '=' + e : '&' + d + '=' + e)
    return a
  }
  this.shareToQQFriend = function () {
    if (typeof goldlog != 'undefined') {
      goldlog.record('/web.1.4', '', 'shareid=QQ', '')
    }
    window.open(
      this.b0926(
        'mqqapi://share/to_fri?src_type=web&version=1&file_type=news',
        {
          share_id: '100389302',
          title: Base64.encode(window.config.title),
          thirdAppDisplayName: Base64.encode('\u624b\u673a\u592e\u89c6\u7f51'),
          url: Base64.encode(window.config.url),
          description: Base64.encode(window.config.desc),
          previewimageUrl: Base64.encode(window.config.img),
          image_url: Base64.encode(window.config.img),
        }
      )
    )
  }
  this.init = function () {
    platform_os = this.getPlantform()
    version.qq = isqqBrowser ? this.getVersion(UA.split('MQQBrowser/')[1]) : 0
    version.uc = isucBrowser ? this.getVersion(UA.split('UCBrowser/')[1]) : 0
    isWeixin = this.is_weixin()
    if (
      (isqqBrowser && version.qq < 5.4 && platform_os == 'iPhone') ||
      (isqqBrowser && version.qq < 5.3 && platform_os == 'Android')
    ) {
      isqqBrowser = bLevel.qq.forbid
    } else {
      if (isqqBrowser && version.qq < 5.4 && platform_os == 'Android') {
        isqqBrowser = bLevel.qq.lower
      } else {
        if (
          isucBrowser &&
          ((version.uc < 10.2 && platform_os == 'iPhone') ||
            (version.uc < 9.7 && platform_os == 'Android'))
        ) {
          isucBrowser = bLevel.uc.forbid
        }
      }
    }
    this.html()
    this.isloadqqApi()
    //控制各设备下显示图标
    if (isWeixin) {
      $('.nativeShare').parent('li').hide()
      $('#nativeShare').find('.weixin').css('display', 'none')
      $('.qq').parent('li').css('display', 'none')
      $('#nativeShare').find('.qq').css('display', 'none')
    } else if (isucBrowser) {
      if (platform_os == 'iPad') {
        $('.nativeShare').parent('li').hide()
        $('#nativeShare').find('.weixin').css('display', 'none')
      }
      $('.qq').parent('li').css('display', 'none')
      $('#nativeShare').find('.qq').css('display', 'none')
    } else if (isqqBrowser) {
      if (platform_os == 'iPad') {
        $('.nativeShare').parent('li').hide()
        $('#nativeShare').find('.weixin').css('display', 'none')
      }
    } else {
      $('.nativeShare').parent('li').hide()
      $('#nativeShare').find('.weixin').css('display', 'none')
      if (
        platform_os == 'Android' ||
        navigator.userAgent.indexOf('baidu') > -1
      ) {
        $('.qq').parent('li').css('display', 'none')
        $('#nativeShare').find('.qq').css('display', 'none')
      }
    }
    if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      $('.qq').parent('li').css('display', 'none')
      $('#nativeShare').find('.qq').css('display', 'none')
    }
  }
  this.init()
  var share = this
  //var items = document.getElementsByClassName('nativeShare');
  var items = $('.nativeShare')
  for (var i = 0; i < items.length; i++) {
    items[i].onclick = function () {
      share.share(this.getAttribute('data-app'))
    }
  }
  //var spitems = document.getElementsByClassName('nativeSharespecial');
  var spitems = $('.nativeSharespecial')
  for (var i = 0; i < spitems.length; i++) {
    spitems[i].onclick = function () {
      window.open(share.pcShare(this.getAttribute('data-app')))
    }
  }
  //var qqitems = document.getElementsByClassName('qq');
  var qqitems = $('.qq')
  for (var i = 0; i < qqitems.length; i++) {
    qqitems[i].onclick = function () {
      share.shareToQQFriend()
    }
  }
  return this
}
