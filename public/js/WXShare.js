// 微信配置
//Ajax
function getAjax(url, data, cb, spacial) {
  $.ajax({
    url: url,
    type: 'get',
    data: data,
    dataType: 'jsonp',
    jsonp: 'cb',
    jsonpCallback: 'cb1',
    cache: true,
    success: function (_data) {
      console.log(_data)
      cb(_data)
    },
    timeout: 10000,
    error: function () {
      warnbox('请求超时，请检查网络或者重新刷新页面！')
    },
  })
}
window.weixinSucess = function (data) {
  console.log('weixinSucess')
  if(!window.wx) {
    window.wx = {}
    return
  }
  window.wx.config({
    debug: false,
    appId: 'wx2723c0deaa5a97e9',
    timestamp: data.data.timestamp,
    nonceStr: data.data.nonceStr,
    signature: data.data.signature,
    jsApiList: ['updateTimelineShareData', 'updateAppMessageShareData'], // 功能列表，我们要使用JS-SDK的什么功能
  })

  window.wx.ready(function () {
    alert('ready2')
    // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
    wx.updateTimelineShareData({
      title: window.config.title, // 分享标题
      link: window.config.url,
      imgUrl: window.config.img, // 分享图标
    })
    // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
    wx.updateAppMessageShareData({
      title: window.config.title, // 分享标题
      desc: window.config.desc, // 分享描述
      link: window.config.url,
      imgUrl: window.config.img, // 分享图标
      type: 'link', // 分享类型,music、video或link，不填默认为link
    })
  })
}

setInterval(function() {
  if(wx) {
    wx.updateTimelineShareData({
      title: window.config.title, // 分享标题
      link: window.config.url,
      imgUrl: window.config.img, // 分享图标
    })
    // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
    wx.updateAppMessageShareData({
      title: window.config.title, // 分享标题
      desc: window.config.desc, // 分享描述
      link: window.config.url,
      imgUrl: window.config.img, // 分享图标
      type: 'link', // 分享类型,music、video或link，不填默认为link
    })
  }
}, 1000)

// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在 页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready 函数中。
getAjax(
  '//api.cntv.cn/list/getWeiXinSignature?t=jsonp',
  {
    appid: 'newstiket',
    serviceId: 'cmsty',
    url: encodeURIComponent(encodeURIComponent(window.location.href.split('#')[0])),
  },
  window.weixinSucess
)

window.wx.ready(function () {
  alert('ready')
  // alert(window.shareObj.title)
  // alert(window.config)
  // alert(window.config.title)
  // var shareInfo = window.shareObj
  // alert(window.shareInfo)
  // alert(window.shareInfo.title)

  // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
  wx.updateTimelineShareData({
    title: window.config.title, // 分享标题
    link: window.config.url,
    imgUrl: window.config.img, // 分享图标
  })
  // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
  wx.updateAppMessageShareData({
    title: window.config.title, // 分享标题
    desc: window.config.desc, // 分享描述
    link: window.config.url,
    imgUrl: window.config.img, // 分享图标
    type: 'link', // 分享类型,music、video或link，不填默认为link
  })
})

setInterval(function() {
  if(wx) {
    wx.updateTimelineShareData({
      title: window.config.title, // 分享标题
      link: window.config.url,
      imgUrl: window.config.img, // 分享图标
    })
    // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
    wx.updateAppMessageShareData({
      title: window.config.title, // 分享标题
      desc: window.config.desc, // 分享描述
      link: window.config.url,
      imgUrl: window.config.img, // 分享图标
      type: 'link', // 分享类型,music、video或link，不填默认为link
    })
  }
}, 1000)

window.isdingding_20190304 = function () {
  //判断是不是钉钉
  var ua = navigator.userAgent.toLowerCase()
  return ua.indexOf('dingtalk') >= 0
}
if (isdingding_20190304()) {
  window.dd.ready(function () {
    dd.biz.navigation.setRight({
      show: true, //控制按钮显示， true 显示， false 隐藏， 默认true
      control: true, //是否控制点击事件，true 控制，false 不控制， 默认false
      text: '', //控制显示文本，空字符串表示显示默认文本
      onSuccess: function (result) {
        //如果control为true，则onSuccess将在发生按钮点击事件被回调
        dd.biz.util.share({
          type: 0, //分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
          title: window.shareObj.title, // 分享标题
          content: window.shareObj.desc, // 分享描述
          url: window.shareObj.url,
          image: window.shareObj.img, // 分享图标
          onSuccess: function () {},
          onFail: function (err) {},
        })
      },
      onFail: function (err) {},
    })
  })
}
