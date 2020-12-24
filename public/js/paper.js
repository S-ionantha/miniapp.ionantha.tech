window.vw = window.innerWidth
window.thisYear = ''

var UA = window.navigator.userAgent.toLowerCase()
var isAndroid = UA.indexOf('android') > -1 || UA.indexOf('linux') > -1 //g
var isIOS = !!UA.match(/\(i[^;]+;( u;)? cpu.+mac os x/)
var isWechat = !!(UA.match(/MicroMessenger/i) == 'micromessenger')
var noSafari = !(window.navigator.userAgent.indexOf("Safari") > -1)

// window.memoryDate = '20201126'
$(function () {
  var $swiper = $('#swiper')
  var $pagation = $('#pagation')
  var distance = 331
  var currentIndex = 0
  var $prev = $('#prev')
  var $next = $('#next')
  var $endCover = $('#end_cover')
  var end = 0
  var showBox = 0
  var $restart = $('#restart')
  window.$contentBrowser = $('#content_browser')
  var $titleList = $('#title_list')
  var $scaleTools = $('#scale_tools')
  var initFontSize = 0.32
  var $articleContent = $('#article_content')
  window.$contentView = $('#content_view')
  var $goTop = $('#go_top')
  var $scrollView = $('#scroll_view')
  var pageIndex = 0
  window.$tabBar = $('#tab_bar')
  var $article = $('#article')
  var $years_scroll = $('#years_scroll')
  var contentBrowserRenderData = []
  var articleRoll = false
  var descRoll = false
  var $shade = $('#shade')
  var isLoaded = false
  var contentBroswerDisplay = false
  var mobileScrollY = 0
  var scrollToPosition = false
  var swiperScroll = false
  var $loading = $('#loading')
  var _passive = {
    passive: false,
  }
  var loadNew = false
  var resizing = false
  var contentBrowserInBody = false
  var $memoryLayer = $('#memory_layer')
  var logoImg =
    'https://p5.img.cctvpic.com/photoAlbum/zgdsb/templet/common/DEPA1606718880024801/logo.png'

  var mContentTitleStage = ''

  var asyncData = {
    loading: function (status, className) {
      if (!$loading[0]) {
        var loading = document.createElement('div')
        loading.id = 'loading'
        loading.className = 'loading'
        loading.innerHTML =
          '<div class="icon-wrap"><i class="icon"></i>正在加载</div>'
        document.body.appendChild(loading)
        $loading = $(loading)
      }
      if (status) {
        $loading[0].className = 'loading'
        if (className) {
          asyncData.loadingInArtcile = true
          $loading.addClass(className)
          $articleContent.html($loading)
          $loading.show()
        } else {
          $loading.fadeIn()
        }
      } else {
        $loading.fadeOut()
        if (asyncData.loadingInArtcile) {
          $('body').append($loading)
          asyncData.loadingInArtcile = false
        }
      }
    },
    rendered: [],
    /**
     * 异步请求参数配置
     * @param {Object} obj
     */
    config: function (obj) {
      var jsonpCallback = obj.uri.split('/')[1] + 'Callback'
      return obj.url
        ? {
            type: 'GET',
            url: obj.url,
            // dataType: 'json',
            // crossDomain: true,
            success: function (res) {
              if (res && res.data) {
                obj.successHandle(res.data)
              } else {
                asyncData.errorHandle('error')
              }
            },
            error: function (err) {
              asyncData.errorHandle(err)
            },
          }
        : {
            url: '//api.cntv.cn/' + obj.uri,
            type: 'GET',
            data: obj.option,
            dataType: 'jsonp',
            cache: true,
            jsonp: 'cb',
            jsonpCallback: jsonpCallback,
            success: function (res) {
              if (res && res.data) {
                obj.successHandle(res.data)
              } else {
                asyncData.errorHandle('error')
              }
            },
            error: function (err) {
              asyncData.errorHandle(err)
            },
          }
    },
    /**
     * 失败响应
     * @param {String} err
     */
    errorHandle: function (err) {
      asyncData.loading(0)
      $articleContent.html('')
    },
    /**
     * 组合日期
     * @param {String} data
     */
    sliceDate: function (date) {
      date = date + ''
      var year = date.slice(0, 4)
      var month = date.slice(4, 6)
      var day = date.slice(6, 8)
      return year + '/' + month + '/' + day
    },
    /**
     * 请求基础数据
     * @param {Object} option
     */
    fetchBaseData: function (option) {
      asyncData.loading(1)
      // var config = asyncData.config({
      //   uri: 'Newspaper/getPeriodicalInfo',
      //   option: option,
      //   successHandle: asyncData.renderBase,
      // })
      var config = asyncData.config({
        url:
          '//zgdsb.cctv.com/shuzibaokan/date/' +
          asyncData.sliceDate(option.d) +
          '/page.json',
        uri: 'Newspaper/getPeriodicalInfo',
        successHandle: asyncData.renderBase,
      })
      $.ajax(config)
    },
    /**
     * 年份数据
     */
    fetchYearsData: function () {
      var config = asyncData.config({
        // url: '//' + location.host + '/shuzibaokan/year/list.json',
        url: '//zgdsb.cctv.com/shuzibaokan/year/list.json',
        uri: 'Newspaper/getYearsInfo',
        successHandle: asyncData.renderYears,
      })
      $.ajax(config)
    },
    /**
     * 下一期封面图数据
     * @param {Object} option
     */
    fetchFillData: function (option) {
      var config = asyncData.config({
        url:
          '//zgdsb.cctv.com/shuzibaokan/date/' +
          asyncData.sliceDate(option.d) +
          '/page.json',
        uri: 'Newspaper/getPeriodicalInfo',
        option: option,
        successHandle: asyncData.renderFill,
      })
      $.ajax(config)
    },
    /**
     * 请求往期数据
     * @param {Object} option
     */
    fetchMemoryData: function (option) {
      var config = asyncData.config({
        uri: 'Newspaper/getPeriodicalList',
        option: option,
        successHandle: asyncData.renderMemory,
      })
      $.ajax(config)
    },
    /**
     * 请求节目单数据
     * @param {Object} option
     */
    fetchMenuData: function (option) {
      var config = asyncData.config({
        uri: 'Newspaper/getEpgEditionList',
        option: option,
        successHandle: asyncData.renderMenu,
      })
      $.ajax(config)
    },
    /**
     * 请求文章详情数据
     * @param {Object} option
     */
    fetchArticleDetail: function (option) {
      asyncData.loading(1, 'half')
      var config = asyncData.config({
        uri: 'Article/newContentInfo',
        option: option,
        successHandle: asyncData.renderDetail,
      })
      $.ajax(config)
    },
    /**
     * 请求单版数据
     * @param {Object} option
     */
    fetchPageData: function (option) {
      if (asyncData.rendered.indexOf(option.e) >= 0) {
        descTemplate($swiper.find('#' + option.e).data('desc'))
        return false
      }
      var config = asyncData.config({
        uri: 'Newspaper/getArticleList',
        option: option,
        successHandle: asyncData.renderPage,
      })
      asyncData.fetchPageDataProcess = $.ajax(config)
      asyncData.rendered.push(option.e)
    },
    /**
     * 重组往期数据
     * @param {Object} data
     */
    concatMemoryData: function (data) {
      var _data = []
      var listDate = 0
      for (var i = 0; i < 12; i++) {
        _data[i] = []
      }
      $.each(data.list, function (index, item) {
        var month = parseInt(item.date.substr(4, 2)) - 1
        listDate =
          listDate < parseInt(item.date) ? parseInt(item.date) : listDate
        _data[month].push(item)
      })
      return {
        listDate: listDate,
        _data: _data,
      }
    },
    /**
     * 期数
     * @param {*} data
     */
    baseStage: function (data, _d) {
      data = data.split(' ')
      if (data && data[2]) {
        mContentTitleStage = data[2].replace(/总/, '')
      }

      return !_d
        ? '<em>' + data[0] + '</em>' + data[1] + ' ' + data[2]
        : '<i>' + data[1] + '</i> ' + data[2]
    },
    /**
     * 基础数据渲染
     * @param {Object} data
     */
    renderBase: function (data) {
      // 此处为加载第一版所需数据
      window.prev = data.prev_date
      window.next = data.next_date
      $('#wrapperPrev').removeClass('active')
      $('#wrapperNext').removeClass('active')
      window.prev && $('#wrapperPrev').addClass('active')
      window.next && $('#wrapperNext').addClass('active')

      window.prev &&
        asyncData.fetchFillData({
          d: window.prev,
          serviceId: 'zgdsb',
        })

      var firstItem = data.list[0]

      // asyncData.fetchPageData({
      //   d: data.date,
      //   e: firstItem.number,
      //   serviceId: 'zgdsb',
      // })

      $('#stage').html(asyncData.baseStage(data.name))
      $endCover.find('.title > em').html(asyncData.baseStage(data.name, 1))
      $('#nav_layer h2').html(
        '<var class="circle">' +
          firstItem.number.toUpperCase() +
          '</var>' +
          firstItem.name.slice(0, 4)
      )

      $('#middle_value').html(
        '<i>' + firstItem.number.toUpperCase() + firstItem.name + '</i>'
      )
      var swiperHTML = ''
      var pagationHTML = ''
      var fillHTML = ''
      var paperNavHTML = ''

      $.each(data.list, function (index, item) {
        var desc = JSON.stringify({
          no: item.number,
          title: item.name,
          pdf: item.pdf,
          list: asyncData.collectionList(item.articleList),
        })
        swiperHTML +=
          '<li class="' +
          (!index ? 'active' : '') +
          '" data-title="' +
          item.name +
          '" data-date="' +
          data.date +
          '" id="' +
          item.number +
          '" data-desc=' +
          desc +
          '>\
          ' +
          asyncData.renderLine(item.articleList) +
          '\
        <div class="figure">\
          <img class="lazy" src="' +
          (index < 9 ? item.big_image : logoImg) +
          '" width="100%" height="100%" data-echo="' +
          item.big_image +
          '" />\
        </div>\
        </li>'

        paperNavHTML +=
          '<li data-id="' +
          item.number +
          '" class="' +
          (!index ? 'current' : '') +
          '">' +
          item.number.toUpperCase() +
          ' ' +
          item.name +
          '</li>'

        pagationHTML +=
          '<li class="swiper-slide ' +
          (!index ? 'active' : '') +
          '">\
          <img class="lazy" src="' +
          (index < 9 ? item.big_image : logoImg) +
          '" width="100%" height="100%" data-echo="' +
          item.small_image +
          '" />\
          <div class="cover">\
            <div class="cover-text">\
              <var>' +
          item.number.toUpperCase() +
          '</var> ' +
          item.name +
          '\
            </div>\
          </div>\
        </li>'
      })
      $swiper.html(swiperHTML) // + fillHTML)
      $pagation.html(pagationHTML)
      $('#paper_nav .nav-list').html(paperNavHTML)
      $memoryLayer.find('.month-list .active').removeClass('active')
      $memoryLayer.find('a[data-date="' + data.date + '"]').addClass('active')
      var _img = new Image()
      _img.onload = function () {
        calcLineSize()
        descTemplate()
        if (asyncData.renderBaseCallback) {
          asyncData.renderBaseCallback()
          asyncData.renderBaseCallback = false
        }
        mobileInit()
        window.paper_edition && !isLoaded && justToArticle()
        isLoaded = true
        asyncData.loading(0)
      }
      _img.src = data.list[0].big_image
    },
    collectionList: function (data) {
      var listData = []
      $.each(data, function (index, item) {
        item.title && listData.push(item.title.replace(/\s*/g, ''))
      })
      return listData
    },
    renderLine: function (data) {
      var lineHTML = ''
      $.each(data, function (index, line) {
        lineHTML +=
          '<a class="line" data-coords="' +
          line.coords +
          '" data-id="' +
          line.id +
          '"></a>'
      })
      return lineHTML
    },
    renderFill: function (data) {
      var fillHTML = ''
      fillHTML +=
        '<li class="fill" >\
        <div class="figure">\
          <img src="' +
        data.list[0].big_image +
        '" width="100%" height="100%" />\
        </div>\
        </li>' +
        '<li class="fill" >\
        <div class="figure">\
          <img src="' +
        data.list[1].big_image +
        '" width="100%" height="100%" />\
        </div>\
        </li>'
      $swiper.append(fillHTML)
      toggleEndCoversBg(vw <= 1200 ? 1 : 0)
    },
    monthListRender: function (data) {
      var html = ''
      $.each(data, function (index, item) {
        var stage = item.name.split(' ')
        html +=
          '<a href="javascript:;" class="' +
          (window.memoryDate == item.date ? 'active' : '') +
          '" data-date="' +
          item.date +
          '" data-id="' +
          item.id +
          '">\
          <div class="figure">\
            <img src="' +
          logoImg +
          '" data-echo="' +
          item.medium_image +
          '" />\
          </div>\
          <div class="info">\
            <p>' +
          stage[0] +
          '<var>' +
          stage[1] +
          '</var></p>\
            <p>' +
          stage[2] +
          '</p>\
          </div>\
        </a>'
      })
      return html
    },
    /**
     * 年份渲染
     */
    renderYears: function (data) {
      if (!data || !data.list) {
        return ''
      }
      var yearHTML = ''
      window.thisYear = window.memoryDate
        ? window.memoryDate.slice(0, 4)
        : data.list[0]
      $.each(data.list, function (index, year) {
        yearHTML +=
          year == thisYear
            ? '<span class="active"><var>' + year + '</var>年</span>'
            : '<span><var>' + year + '</var>年</span>'
      })
      $('#years_scroll').html(yearHTML)

      asyncData.fetchMemoryData({
        d: window.thisYear, //new Date().getFullYear(),
        serviceId: 'zgdsb',
      })

      contentViewWidth = $contentView.width()

      if (vw > 750) {
        scaleContentView(vh)
      }
      var UA = navigator.userAgent
      if (!!UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        if (vw < 800 && !isWechat) {
          $addDesktop.fadeIn()
          var time = setTimeout(function () {
            $addDesktop.hide()
            clearTimeout(time)
          }, 5e3)
        }
      }
    },
    /**
     * 往期数据渲染
     * @param {Object} data
     */
    renderMemory: function (data) {
      if (!data) {
        return ''
      }
      data = asyncData.concatMemoryData(data)
      var listDate = data.listDate
      data = data._data
      memoryDate = memoryDate ? memoryDate : listDate + ''
      asyncData.fetchBaseData({
        d: window.memoryDate,
        serviceId: 'zgdsb',
      })
      asyncData.fetchMenuData({
        d: listDate,
        serviceId: 'zgdsb',
      })
      var memoryHTML = ''
      for (var i = 11; i >= 0; i--) {
        if (data[i].length) {
          memoryHTML +=
            '<li>\
            <div class="title">' +
            getDate.prependZero(i + 1) +
            '月</div>\
            <div class="content clearfix">' +
            asyncData.monthListRender(data[i]) +
            '</div>\
          </li>'
        }
      }
      $('#memory_layer .month-list').html(memoryHTML)
      $memoryLayer.children().last().scrollTop(0)
      $memoryLayer.hasClass('show') && imgLazyLoad('2')
    },
    /**
     * 节目单数据渲染
     * @param {Object} data
     */
    renderMenu: function (data) {
      var menuHTML = '<ul class="week">'
      var menuDate = data.list && data.list.length ? data.list[0].date : ''
      var liInterval = 0
      data.list &&
        data.list.length &&
        $.each(data.list, function (index, item) {
          liInterval =
            data.list[index + 1] &&
            (data.list[index + 1].date !== item.date ? 'li-interval' : '')
          menuDate = item.date
          menuHTML +=
            '<li class="' +
            liInterval +
            '" data-no="' +
            item.number +
            '" data-date="' +
            item.date +
            '">\
          <a href="javascript:;">' +
            moment(item.edate).format('MM月DD日（dddd）') +
            '</a>\
        </li>'
        })
      $('#pc_tvmenu .weeks-list').html(menuHTML + '</ul>')
    },
    /**
     * 单版数据渲染
     * @param {Object} data
     */
    renderPage: function (data) {
      // asyncData.fetchPageDataProcess = false
      // var $active = $swiper.find('.active')
      // if (window.loadNext && !scrollToPosition) {
      //   $active = $active.next()
      // }
      // var list = []
      // var lineHTML = ''
      // data.list &&
      //   data.list.length &&
      //   $.each(data.list, function (index, item) {
      //     var coords = item.coords && item.coords.split(',')
      //     list.push(item.title)
      //     if (coords && coords.length) {
      //       lineHTML +=
      //         '<div class="line" data-coords="' +
      //         coords +
      //         '" data-id="' +
      //         item.id +
      //         '" style="left:' +
      //         coords[0] +
      //         'px;top:' +
      //         coords[1] +
      //         'px;width:' +
      //         coords[2] +
      //         'px;height:' +
      //         coords[3] +
      //         'px;" data-content=""></div>'
      //     }
      //   })
      // $active.prepend(lineHTML)
      // var desc = $active.data('desc')
      // desc.list = list
      // $active.attr('data-desc', JSON.stringify(desc))
      // descTemplate()
      // calcLineSize()
      // if (asyncData.renderBaseCallback) {
      //   asyncData.renderBaseCallback()
      //   asyncData.renderBaseCallback = false
      // }
    },
    /**
     * 渲染文章详情数据
     * @param {Object} data
     */
    renderDetail: function (data) {
      if (data) {
        updateShare(data)
      }
      $article
        .find('.sub-title')
        .css({ display: data && data.sub_title ? 'block' : 'none' })
      $article
        .find('.sub-title span')
        .text(data && data.sub_title ? data.sub_title : '')
      $articleContent.html(data && data.content ? data.content : '')
      var $imgs = $article.find('#article_content img')
      if (articleRoll) {
        if (!$imgs.length) {
          $article.scrollTop(1)
          articleRoll.resize()
          $article.scrollTop(0)
          asyncData.loading(0)
        } else {
          var thisArticleImagesLength = []
          $.each($imgs, function (index, img) {
            var _img = new Image()
            _img.onload = function () {
              thisArticleImagesLength.push(img)
              if (thisArticleImagesLength.length == $imgs.length) {
                $article.scrollTop(1)
                articleRoll.resize()
                $article.scrollTop(0)
                asyncData.loading(0)
              }
            }
            _img.src = img.src
          })
        }
      } else {
        if (!$imgs.length) {
          articleScroll.refresh()
          articleScroll.scrollTo(0, 0, 10)
        } else {
          var thisArticleImagesLength = []
          $.each($imgs, function (index, img) {
            var _img = new Image()
            _img.onload = function () {
              thisArticleImagesLength.push(img)
              if (thisArticleImagesLength.length == $imgs.length) {
                articleScroll.refresh()
                articleScroll.scrollTo(0, 0, 10)
              }
            }
            _img.src = img.src
          })
        }
      }
    },
  }

  /**
   * 图片懒加载
   * PC端
   * 切换底部缩略图
   * 点击正文内容
   * 点击往期查询
   * 往期查询滚动
   * 点击节目单跳转
   * 移动端
   * 滚动加载
   * 打开往期查询
   * 往期查询滚动
   * 点击目录导航跳转
   * 点击节目单跳转
   */

  var lazyMap = {
    '0': $swiper,
    '1': $pagation,
    '2': $memoryLayer,
  }
  var _logoImg = logoImg.match(/\/DEPA1606718880024801\/(.*)/)[1]
  function imgLazyLoad(option, platform) {
    var $wrap = lazyMap[option]

    switch (option) {
      case '0':
        var $li = $wrap.find('.active')
        var activeIndex = $li.index()

        var $activeImg = $li.find('img')
        $activeImg.data('echo') && ($activeImg[0].src = $activeImg.data('echo'))
        for (var i = currentIndex; i < currentIndex + 3; i++) {
          var $nextImg = $($wrap.children()[i]).find('img')
          if ($nextImg[0] && $nextImg[0].src.indexOf(_logoImg) >= 0) {
            $nextImg[0].src = $nextImg.data('echo')
          }
        }

        if (activeIndex > 1 && vw <= 1200) {
          var $prevImg = $($wrap.children()[activeIndex - 1]).find('img')
          if ($prevImg[0].src.indexOf(_logoImg) >= 0) {
            for (var p = 8; p < activeIndex; p++) {
              var $_prevImg = $($wrap.children()[p]).find('img')
              if ($_prevImg[0] && $_prevImg[0].src.indexOf(_logoImg) >= 0) {
                $_prevImg[0].src = $_prevImg.data('echo')
              }
            }
          }
        }
        break
      case '1':
        var start = pageIndex * 9
        if (start >= $wrap.children().length - 1) {
          start = start - 8
        }
        for (var p = start; p < start + 9; p++) {
          var $currentImg = $($wrap.find('img')[p])
          if ($currentImg[0] && $currentImg[0].src.indexOf(_logoImg) >= 0) {
            $currentImg[0].src = $currentImg.data('echo')
          }
        }
        break
      case '2':
        var $memoryFirstImg = $wrap.find('img')[0]
        if ($memoryFirstImg && $memoryFirstImg.src.indexOf(_logoImg) < 0) {
          return false
        }
        $.each($wrap.find('img'), function (index, img) {
          var $img = $(img)
          $img[0].src = $img.data('echo')
        })
        break
    }
  }

  window.baseDateReload = function (date) {
    if (!date) return
    asyncData.rendered = []
    window.memoryDate = date
    loadNew = true
    scrollToPosition = true
    asyncData.fetchBaseData({
      d: window.memoryDate,
      serviceId: 'zgdsb',
    })
    if (vw > 1200) {
      slideTo(0)
      pageMove(0)
    } else {
      mobileInit()
      HidePop()
      swiperScroll.scrollTo(0, 0, 300)
    }
    loadNew = false
  }

  function getDate(stamp) {
    var date = stamp ? new Date(stamp) : new Date()
    return (
      getDate.prependZero(date.getFullYear()) +
      getDate.prependZero(date.getMonth() + 1) +
      getDate.prependZero(date.getDate())
    )
  }

  getDate.prependZero = function (n) {
    n += ''
    return n.length == 1 ? '0' + n : n
  }

  /**
   * 计算线框尺寸
   */
  function calcLineSize() {
    var imageWidth = vw > 1200 ? 331 : vw > 750 ? 726 : vw - 24
    $.each($swiper.find('.line'), function (index, line) {
      var $line = $(line)
      calcLineSize.scale = imageWidth / 400
      var coords = $line.data('coords')
      if (coords) {
        coords = coords.split(',')
        $line.css({
          left: calcLineSize.scale * parseInt(coords[0]),
          top: calcLineSize.scale * parseInt(coords[1]),
          width: calcLineSize.scale * coords[2],
          height: calcLineSize.scale * coords[3],
        })
      }
    })
  }
  /**
   *  自定义滚动条
   */
  var rollConfig = {
    cursorcolor: '#9B9B9B',
    background: '#F2F2F2',
    cursorborder: '0 none',
    cursorwidth: '6px',
    railpadding: { top: 0, right: 2, left: 2, bottom: 0 },
    railoffset: {
      top: 5,
      left: -5,
    },
    cursoropacitymin: 1,
  }

  /**
   * 禁止&恢复滚动
   * @param {Bollean} status
   * 禁止 status = false
   * 恢复 status = true
   */
  function toggleTouchMove(status) {
    document.documentElement[
      !status ? 'addEventListener' : 'removeEventListener'
    ]('touchmove', toggleTouchMove.preventDefault, _passive)
  }

  toggleTouchMove.preventDefault = function (e) {
    e.preventDefault()
  }

  /**
   * 新闻描述模板
   * @param {Object} obj
   */
  function descTemplate(obj) {
    if (!obj) {
      obj = $swiper.find('.active').data('desc')
    }
    obj.no &&
      $('#nav_layer h2').html(
        '<var class="circle">' +
          obj.no.toUpperCase() +
          '</var>' +
          obj.title.slice(0, 4)
      )
    if (!obj.list) {
      obj.list = []
    }
    contentBrowserRenderData = obj.list
    var listHTML = ''
    obj.list.length &&
      $.each(obj.list, function (index, item) {
        listHTML += '<li >' + item + '</li>'
      })

    $titleList.html(listHTML)
    $titleList.scrollTop(1)
    descTemplate.timer && clearTimeout(descTemplate.timer)
    descTemplate.timer = setTimeout(function () {
      descRoll && descRoll.resize()
      $titleList.scrollTop(0)
    }, 0)
  }

  /**
   * 图片滚动
   * @param {Number} index
   */
  window.slideTo = function (index) {
    var active = $swiper.children()[index]
    // console.log(currentIndex, loadNew, active.id)
    // if (currentIndex !== index && !loadNew) {
    //   asyncData.fetchPageData({
    //     d: window.memoryDate,
    //     e: active.id,
    //     serviceId: 'zgdsb',
    //   })
    // }
    // console.log($(active).data('desc'))
    descTemplate($(active).data('desc'))
    // 切换后文章滚动到初始位置
    currentIndex !== index &&
      $article.animate(
        {
          scrollTop: 0,
        },
        0
      )

    if (vw < 750) {
      return false
    }
    var _d = 2
    var n = (index - 1) * 20 + 20 + _d
    n = n < 0 ? 0 : n
    $swiper.find('.active').removeClass('active')
    $($swiper.children()[index]).addClass('active')
    $pagation.find('.active').removeClass('active')
    $($pagation.children()[index]).addClass('active')
    'transition' in document.documentElement.style
      ? $swiper.css({
          msTransform: 'translate(-' + (distance * index + n) + 'px,0)',
          transform: 'translate(-' + (distance * index + n) + 'px,0)',
        })
      : $swiper.animate(
          {
            left: -(distance * index + n) + 'px',
          },
          500
        )
    $swiper
      .parent()
      [index > $pagation.children().length - 3 ? 'addClass' : 'removeClass'](
        'end'
      )
    currentIndex = index
    if (index == $pagation.children().length - 1) {
      setTimeout(function () {
        $endCover.addClass('show')
      }, 300)
      end = true
    } else {
      $endCover.removeClass('show')
    }
    HidePop()
    imgLazyLoad('0')
    active.id !== $('#pc_tvmenu .selected').data('no') &&
      $('#pc_tvmenu .selected').removeClass('selected')
  }

  /**
   * 分享配置
   * @param {Object} data
   */

  window.updateShare = function (data) {
    if (data) {
      shareObj.shareUrl = data.url
      shareObj.shareTitle = data.title
      shareObj.summary = data.desc
      shareObj.desc = data.desc

      config.url = data.url
      config.title = data.title
      config.desc = data.desc
    } else {
      window.shareObj = {
        shareUrl: 'https://zgdsb.cctv.com/paper/index.shtml',
        shareTitle: '中国电视报',
        pic:
          'https://p5.img.cctvpic.com/photoAlbum/zgdsb/templet/common/DEPA1606718880024801/icon.png',
        summary: '《中国电视报》是由中央广播电视总台主办的唯一面向国内外发行的国家级电视报。主要预告、推介央视所有频道的电视节目和影视剧，同时刊登全国37家省台卫星频道节目表，报道屏前幕后新闻和中外影视动态，提供与影视节目有关的延伸服务。《中国电视报》集知识性、实用性、趣味性、服务性、可读性为一体，是宣传报道中央广播电视总台最得力的平面媒体，也是中国家喻户晓的一份专业影视报纸。',
        desc:
          '《中国电视报》是由中央广播电视总台主办的唯一面向国内外发行的国家级电视报。主要预告、推介央视所有频道的电视节目和影视剧，同时刊登全国37家省台卫星频道节目表，报道屏前幕后新闻和中外影视动态，提供与影视节目有关的延伸服务。《中国电视报》集知识性、实用性、趣味性、服务性、可读性为一体，是宣传报道中央广播电视总台最得力的平面媒体，也是中国家喻户晓的一份专业影视报纸。',
      }

      window.config = {
        //分享相关参数
        url: 'https://zgdsb.cctv.com/paper/index.shtml',
        title: '中国电视报',
        desc:
          '《中国电视报》是由中央广播电视总台主办的唯一面向国内外发行的国家级电视报。主要预告、推介央视所有频道的电视节目和影视剧，同时刊登全国37家省台卫星频道节目表，报道屏前幕后新闻和中外影视动态，提供与影视节目有关的延伸服务。《中国电视报》集知识性、实用性、趣味性、服务性、可读性为一体，是宣传报道中央广播电视总台最得力的平面媒体，也是中国家喻户晓的一份专业影视报纸。',
        img:
          'https://p5.img.cctvpic.com/photoAlbum/zgdsb/templet/common/DEPA1606718880024801/icon.png',
      }
    }
    // 配置标题
    window.document.title = window.shareObj.shareTitle
    // 动态配置二维码
    window.qrcode.clear()
    window.qrcode.makeCode(window.shareObj.shareUrl)
    // 动态更新微信原生分享
    if (wx) {
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
  }

  $restart.on('click', function () {
    end = false
    $endCover.removeClass('show')
    if (vw > 1200) {
      slideTo(0)
      pageMove(0)
    } else {
      swiperScroll.scrollTo(0, 0, 300)
    }
  })

  var $prevArticleButton = $('#prev_article')
  var $nextArticleButton = $('#next_article')

  function contentBrowserRender(index) {
    if (contentBrowserRenderData.length <= 1) {
      $prevArticleButton.addClass('disabled').siblings().addClass('disabled')
    } else {
      switch (index) {
        case 0:
          $prevArticleButton
            .addClass('disabled')
            .siblings()
            .removeClass('disabled')
          break
        case contentBrowserRenderData.length - 1:
          $nextArticleButton
            .addClass('disabled')
            .siblings()
            .removeClass('disabled')
          break
        default:
          $prevArticleButton
            .removeClass('disabled')
            .siblings()
            .removeClass('disabled')
          break
      }
    }
    contentBrowserRender.index = index
    var $active = $swiper.find('.active')
    $contentBrowser
      .find('.status-bar .title')
      .html(
        mContentTitleStage +
          '·' +
          $active[0].id.toUpperCase() +
          ' ' +
          $active.data('title')
      )

    $article.find('.title').html($active.data('desc').list[index])
    $contentBrowser
      .find('.date')
      .html(moment($active.data('date') + '').format('YYYY年MM月DD日'))
    asyncData.fetchArticleDetail({
      id: $swiper.find('.line.visible').data('id'),
      serviceId: 'zgdsb',
    })
  }

  $('#change_tools').on('click', 'span', function () {
    var $this = $(this)
    if ($this.hasClass('disabled')) {
      return false
    }
    contentBrowserRender.index += $this.index() ? 1 : -1
    $swiper.find('.active').addClass('selected')
    var $line = $($swiper.find('.active .line')[contentBrowserRender.index])
    toggleContentBroswer(1, $line)
  })

  window.toggleContentBroswer = function (status, $line) {
    contentBroswerDisplay = status

    if (swiperScroll) {
      mobileScrollY = swiperScroll.y
    }

    toggleTouchMove(!status)

    if (status) {
      if (vw <= 1200) {
        toggleContentBroswer.timer && clearTimeout(toggleContentBroswer.timer)
        toggleContentBroswer.timer = setTimeout(function () {
          $contentView.css({
            zIndex: 13,
            paddingTop: 0,
          })
        }, 500)
        $tabBar.fadeOut()
      } else {
        $endCover.hasClass('show') &&
          $contentBrowser.removeAttr('style') &&
          $contentBrowser.width($contentBrowser.width() + 2)
      }

      var index = $line.index()
      $swiper.find('.line.visible').removeClass('visible')
      $line.addClass('visible')

      contentBrowserRender(index)
      $contentBrowser.addClass('show')
      $goTop.css({
        zIndex: 20,
        visibility: 'hidden',
      })
      $line.parent().addClass('selected')
      $($titleList.children()[index])
        .addClass('active')
        .addClass('selected')
        .siblings()
        .removeClass('active')
        .removeClass('selected')
      // $('#title_list .selected').removeClass('selected')
      location.hash = '#viewArticle'
      goldlog && goldlog.sendPV()
    } else {
      updateShare()
      $endCover.hasClass('show') && $contentBrowser.removeAttr('style')
      $swiper.find('.selected').removeClass('selected')
      $contentBrowser.removeClass('show')
      if (vw <= 1200) {
        $goTop.removeAttr('style')
        $contentView.removeAttr('style')
        $tabBar.fadeIn()
      }
      $goTop[swiperScroll.y > 500 ? 'fadeIn' : 'fadeOut']()
      $titleList.find('.active').removeClass('active')
    }
  }

  /**
   * 字体缩放
   * @param {Number} zoom
   */
  function scaleFontSize(zoom) {
    $articleContent.css({
      fontSize: zoom + 'rem',
    })
    // $articleContent.removeClass('rich_text_26')
    // $articleContent.removeClass('rich_text_24')
    // $articleContent.removeClass('rich_text_30')
    // $articleContent.removeClass('rich_text_32')
    // $articleContent.addClass('rich_text_' + ((zoom * 100).toFixed(0) - 4))
    articleRoll && articleRoll.resize()
  }

  $(window).on('hashchange', function (e) {
    var hash = location.hash.replace('#', '')
    !hash && toggleContentBroswer(0)
  })

  $scaleTools.on('click', 'span', function () {
    var $this = $(this)
    if ($this.hasClass('disabled')) {
      return false
    }
    var scale = parseInt($this.data('zoom'))
    var $disabled = $this.parent().find('.disabled')

    if (scale == 0) {
      initFontSize = 0.32
      $(this).addClass('disabled').siblings().removeClass('disabled')
    } else {
      initFontSize = parseInt(initFontSize * 100 + scale * 2) / 100
      switch (initFontSize) {
        case 0.32:
          $scaleTools.find('span[data-zoom="0"]').addClass('disabled')
          break
        case 0.36:
          // case '0.36':
          $(this).addClass('disabled')
          break
        case 0.28:
          // case '0.28':
          $(this).addClass('disabled')
          break
        default:
          $disabled.removeClass('disabled')
          break
      }
    }
    scaleFontSize(initFontSize)
  })

  $('#content_browser .status-bar').on('click', function (e) {
    var target = e.target
    if (target.id == 'close_browser' || vw <= 1200) {
      updateShare()
      // toggleContentBroswer(0)
      showBox = false
      location.hash = '#'
      setTimeout(function () {
        $articleContent.html('')
      }, 50)
    }
  })

  // 点击节目单
  var tvmenuTimer = null
  $('#pc_tvmenu').on('click', 'a', function (e) {
    var $li = $(this).parent()
    $li.addClass('selected').siblings().removeClass('selected')
    var date = $li.data('date')
    var index = $swiper.find('#' + $li.data('no')).index()
    var n = Math.floor(index / 9)
    scrollToPosition = true
    if (date != window.memoryDate) {
      window.memoryDate = date
      pageIndex = 0
      asyncData.rendered = []
      loadNew = true
      asyncData.fetchBaseData({
        d: window.memoryDate,
        serviceId: 'zgdsb',
      })
      asyncData.renderBaseCallback = function () {
        var newIndex = $swiper.find('#' + $li.data('no')).index()
        if (vw > 1200) {
          loadNew = false
          slideTo(newIndex)
          pageMove(n)
        } else {
          mobileInit()
          HidePop()
          setTimeout(function () {
            scrollToPaper(newIndex)
          }, 300)
          imgLazyLoad('0')
        }
      }
    } else {
      loadNew = false
      if (vw > 1200) {
        slideTo(index)
        n !== pageIndex && pageMove(n)
      } else {
        HidePop()
        setTimeout(function () {
          scrollToPaper(index)
        }, 0)
      }
    }
  })

  $swiper.on('click', '.line', function (e) {
    var $line = $(this)
    if (vw <= 1200) {
      if (showBox) {
        HidePop()
        showBox = false
        return false
      }
      swiperScroll.scrollTo(0, -($line.parent()[0].offsetTop - 18), 0)
    }
    $swiper.find('.visible').removeClass('visible')
    $line.addClass('visible').siblings().removeClass('visible')
    $line.parent().addClass('active').siblings().remove('active')
    HidePop()
    setTimeout(function () {
      toggleContentBroswer(1, $line)
      $titleList.scrollTop($titleList.children()[$line.index()].offsetTop - 120)
    }, 100)
  })

  $('#nav_layer').on('click', 'li', function (e) {
    $(this).addClass('selected').siblings().removeClass('selected')
    $swiper
      .find('.active')
      .addClass('selected')
      .siblings()
      .removeClass('active')

    var $line = $($swiper.find('.active .line')[$(this).index()])
    $line.addClass('visible').siblings().removeClass('visible')
    vw <= 1200 && scrollToPaper($swiper.find('.active').index())
    toggleContentBroswer(1, $line)
  })

  $swiper.on('click', 'li', function (e) {
    vw <= 1200 && showBox && HidePop()
    if ($(this).hasClass('fill') || vw <= 1200) {
      return false
    }
    if (currentIndex !== $(this).index()) {
      slideTo($(this).index())
      var n = Math.floor($(this).index() / 9)
      n !== pageIndex && pageMove(n)
    }
  })

  $titleList.on('mouseenter', 'li', function () {
    toggleTouchMove(true)
    var index = $(this).index()
    $($swiper.find('.active .line')[index])
      .addClass('hover')
      .siblings()
      .removeClass('hover')
  })

  $titleList.on('mouseleave', 'li', function () {
    $swiper.find('.hover').removeClass('hover')
  })

  $swiper.on('mouseenter', '.active .line', function () {
    var index = $(this).index()
    $($titleList.children()[index])
      .addClass('hover')
      .siblings()
      .removeClass('hover')
  })

  $swiper.on('mouseleave', '.active .line', function () {
    $titleList.find('.hover').removeClass('hover')
  })

  $scrollView.on('click', 'li', function () {
    $contentBrowser.hasClass('show') && toggleContentBroswer(0)
    slideTo($(this).index())
  })

  /**
   * 缩略图滚动
   * @param {Number} n
   */
  window.pageMove = function (n) {
    vh = window.innerHeight
    var marginRight = vh <= 900 ? 64 : 40
    pageIndex = n
    var num = $pagation.children().length
    var _d = n ? 2 * n : 0

    var distance = -(
      pageIndex * $pagation.parent().width() -
      _d +
      marginRight * pageIndex
    )
    switch (pageIndex) {
      case 0:
        $prev.addClass('disabled')
        $next.hasClass('disabled') && $next.removeClass('disabled')
        break
      case Math.floor(num / 9):
        var lastPageLength = num % 9
        if (lastPageLength < 9) {
          if (!pageMove.moveDistance) {
            pageMove.moveDistance = -(
              $pagation.parent().width() * (n - 1) -
              _d +
              marginRight * (n - 1)
            )
          }

          distance =
            pageMove.moveDistance -
            (($($pagation.children()[0]).width() + 2) * lastPageLength +
              marginRight * lastPageLength)
        }
        $next.addClass('disabled')
        $prev.hasClass('disabled') && $prev.removeClass('disabled')
        break
      default:
        $prev.hasClass('disabled') && $prev.removeClass('disabled')
        $next.hasClass('disabled') && $next.removeClass('disabled')
        break
    }

    'transition' in document.documentElement.style
      ? $pagation.css({
          msTransform: 'translate(' + distance + 'px, 0)',
          transform: 'translate(' + distance + 'px, 0)',
        })
      : $pagation.animate(
          {
            left: distance + 'px',
          },
          500
        )
    pageMove.moveDistance = distance
    imgLazyLoad('1')
  }

  $scrollView.on('click', '.button', function () {
    var $this = $(this)
    var id = $this.prop('id')

    if ($this.hasClass('disabled')) {
      return false
    }
    switch (id) {
      case 'prev':
        pageIndex -= 1
        break
      case 'next':
        pageIndex += 1
        break
    }
    pageMove(pageIndex)
  })

  var $toggle_menu = $('#toggle_menu')
  var $toggle_memory = $('#toggle_memory')
  var $toggle_rss = $('#toggle_rss')
  var $toggle_weibo = $('#toggle_weibo')
  var $toggle_share = $('#toggle_share')
  var $pdf_show = $('#pdf_show')

  $pdf_show.bind('click', function () {
    var pdf = $swiper.find('.active').data('desc').pdf
    window.open(pdf)
  })

  /**
   * 移动端底部抽屉层
   * @param {Object} $this
   * @param {Object} $ele
   */
  function toggleShow($this, $ele) {
    if (vw < 750) {
      return false
    }

    $this[0].id.indexOf('share') < 0 && toggleContentBroswer(0)
    if (showBox && !$this.hasClass('selected')) {
      showBox.button.removeClass('selected')
      showBox.pop.removeClass('show')
      showBox = false
    }
    $this.toggleClass('selected')
    $ele.toggleClass('show')
    showBox = {
      button: $this,
      pop: $ele,
    }
  }

  /**
   * 基于视窗高度缩放主图区域
   * @param {Number} vh
   */
  // var $monthList = $('#memory_layer .month-list')
  // var $weeksList = $('#pc_tvmenu .weeks-list')
  function scaleContentView(vh) {
    var scale = 1
    if (vh <= 720 || vh >= 900) {
      scale = (vh / 720).toFixed(2) - 0.1
    }
    if (scale * 1248 > vw) {
      scale = (vw / 1200).toFixed(2) - 0.1
    }
    $contentView.css({
      msTransform: 'translate(0, -50%) scale(' + scale + ')',
      transform: 'translate(0, -50%) scale(' + scale + ')',
    })
    // if (vh <= 720) {
    //   scale = (vh / 720).toFixed(2) - 0.1
    //   $('.site-header').css({
    //     msTransform: 'translate(0, 0) scale(' + 1 + ')',
    //     transform: 'translate(0, 0) scale(' + 1 + ')',
    //   })
    //   $scrollView.css({
    //     msTransform: 'translate(0, 0) scale(' + 1 + ')',
    //     transform: 'translate(0, 0) scale(' + 1 + ')',
    //   })
    // }else if(vh >= 900){
    //   scale = (vh / 720).toFixed(2)
    //   var y = 100
    //   if(scale >= 2){
    //     scale = scale - 1
    //     if(scale > 3){
    //       var ts =  Math.abs(scale - 4)*100
    //       y = 100 + (scale >= 4 ? (ts/2 + 50) : (50 - ts/2))
    //     }else{
    //       var ds = Math.abs(scale - 2)*100
    //       y = scale >= 2 ? (ds/2 + 50) : (50 - ds/2)
    //     }
    //     $('.site-header').css({
    //       msTransform: 'translate(0, '+ y +'%) scale(' + scale + ')',
    //       transform: 'translate(0, '+ y +'%) scale(' + scale + ')',
    //     })
    //     $scrollView.css({
    //       msTransform: 'translate(0, -'+ y +'%) scale(' + scale + ')',
    //       transform: 'translate(0, -'+ y +'%) scale(' + scale + ')',
    //     })
    //     $monthList.height($monthList.height() / scale - 155)
    //     $weeksList.height($weeksList.height() / scale - 155)

    //   }else{
    //     scale = 1
    //     $('.site-header').css({
    //       msTransform: 'translate(0, 0) scale(' + 1 + ')',
    //       transform: 'translate(0, 0) scale(' + 1 + ')',
    //     })
    //     $scrollView.css({
    //       msTransform: 'translate(0, 0) scale(' + 1 + ')',
    //       transform: 'translate(0, 0) scale(' + 1 + ')',
    //     })
    //   }
    // }
    // $contentView.css({
    //   msTransform: 'translate(0, -50%) scale(' + scale + ')',
    //   transform: 'translate(0, -50%) scale(' + scale + ')',
    // })
  }

  /**
   * 设置结束页背景
   * @param {Bollean} status
   */
  function toggleEndCoversBg(status) {
    try {
      status
        ? $endCover.css({
            backgroundImage:
              'url(' + $swiper.find('.fill').first().find('img')[0].src + ')',
          })
        : $endCover.removeAttr('style')
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * 更改窗口大小切换至当前位置
   */
  function resizeWindowChangeCurrentIndex() {
    if (vw <= 1200) {
      scrollToPaper(currentIndex)
    } else {
      pageMove(Math.floor(currentIndex / 9))
      slideTo(currentIndex)
    }

    resizeWindowChangeCurrentIndex.timer &&
      clearTimeout(resizeWindowChangeCurrentIndex.timer)
    resizeWindowChangeCurrentIndex.timer = setTimeout(function () {
      calcLineSize()
    }, 0)
  }

  function resizeEnbledReload(vw) {
    // 移动切PC
    if (
      (resizeEnbledReload.prevSize &&
        resizeEnbledReload.prevSize > 1200 &&
        vw <= 1200) ||
      (resizeEnbledReload.prevSize <= 1200 && vw > 1200)
    ) {
      location.reload()
    }
    // PC切移动
    resizeEnbledReload.prevSize = vw
  }

  $(window).on('resize', function () {
    vw = window.innerWidth
    vh = window.innerHeight

    resizeEnbledReload(vw)

    // 移动端横屏，无需进行处理
    if (
      vw <= 1200 &&
      window.orientation !== undefined &&
      ((isIOS && noSafari && Math.abs(window.orientation) !== 90) ||
        (!(isIOS && noSafari) && Math.abs(window.orientation) !== 0))
    ) {
      return false
    }
    if (vw > 1200 && vw <= contentViewWidth) {
      $('body').css({
        width: '100%',
        // overflow: 'auto',
      })
      $('.tvpaper-container').css({
        position: 'relative',
        width: contentViewWidth + 'px',
      })
    } else {
      $('body').css({
        width: 'auto',
        overflow: 'hidden',
      })
      $('.tvpaper-container').css({
        position: 'static',
        width: 'auto',
      })
    }

    if (vw <= 1200) {
      resizing = true
      $swiper.removeAttr('style')

      $contentView.css({
        msTransform: 'translate(0, 0) scale(1)',
        transform: 'translate(0, 0) scale(1)',
      })
      yearScroll.$wrap.css({
        msTransform: 'translate(0, 0)',
        transform: 'translate(0, 0)',
      })
      window.prev && toggleEndCoversBg(1)
      $tabBar.show()
    } else {
      scaleContentView(vh)
      toggleEndCoversBg(0)
      $tabBar.hide()
      asyncData.resizeTimer && clearTimeout(asyncData.resizeTimer)
      asyncData.resizeTimer = setTimeout(function () {
        window.tvMenuRoll && window.tvMenuRoll.resize()
        window.memoryRoll && window.memoryRoll.resize()
      }, 500)
    }
    mobileInit()
    !showBox && resizeWindowChangeCurrentIndex()
  })

  var $addDesktop = $('#desktop_layer')
  var contentViewWidth = 0
  $(window).on('DOMContentLoaded', function () {
    vw = window.innerWidth
    vh = window.innerHeight

    location.hash = '#'

    // 年份数据
    asyncData.fetchYearsData()

    // if (window.memoryDate) {
    //   // 往期数据
    //   asyncData.fetchMemoryData({
    //     d: window.memoryDate.slice(0, 4), //new Date().getFullYear(),
    //     serviceId: 'zgdsb',
    //   })

    //   contentViewWidth = $contentView.width()

    //   if (vw > 750) {
    //     scaleContentView(vh)
    //   }
    //   var UA = navigator.userAgent
    //   if (!!UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    //     if (vw < 800) {
    //       $addDesktop.fadeIn()
    //       var time = setTimeout(function () {
    //         $addDesktop.hide()
    //         clearTimeout(time)
    //       }, 5e3)
    //     }
    //   }
    // }
  })

  /**
   * 默认跳转至对应版面，打开对应文章
   */
  function justToArticle() {
    $addDesktop.hide()
    var pid = window.paper_edition
    var $paper = $swiper.find('#' + pid)
    var index = $paper.index()
    if (vw <= 1200) {
      // 移动端
      $paper.addClass('active')
      scrollToPaper(index)
    } else {
      //PC端
      slideTo(index)
      pageMove(Math.floor(index / 9))
    }
    justToArticle.timer && clearTimeout(justToArticle.timer)
    justToArticle.timer = setTimeout(function () {
      toggleTouchMove(true)
      var $article = $swiper.find('.line[data-id="' + window._id + '"]')
      // toggleContentBroswer(1, $article)
      contentBroswerDisplay = 1
      mobileScrollY = swiperScroll.y
      if (vw <= 1200) {
        toggleContentBroswer.timer && clearTimeout(toggleContentBroswer.timer)
        toggleContentBroswer.timer = setTimeout(function () {
          $contentView.css({
            zIndex: 13,
            paddingTop: 0,
          })
        }, 500)
        $tabBar.fadeOut()
      }

      var index = $article.index()
      $article.addClass('visible').siblings().removeClass('visible')
      toggleContentBroswer(1, $article)
      // contentBrowserRender(index)
      // $contentBrowser.addClass('show')
      $goTop.css({
        zIndex: 20,
        visibility: 'hidden',
      })
      $article.parent().addClass('selected')
      $($titleList.children()[index])
        .addClass('active')
        .addClass('selected')
        .siblings()
        .removeClass('active')
        .removeClass('selected')
      // $('#title_list .selected').removeClass('selected')
      location.hash = '#articleView'
    }, 500)
  }

  /**
   * 移动端初始化
   */
  function mobileInit() {
    if (vw <= 1200) {
      if (!swiperScroll) {
        swiperScroll = BetterScroll.createBScroll('#content_view .wrapper', {
          stopPropagation: false,
          probeType: 3,
          click: true,
          // tap: 'click',
          mouseWheel: true,
          tap: true,
          preventDefault: false,
          useTransition: false,
          bounce: {
            top: false,
          },
        })

        articleScroll = BetterScroll.createBScroll('#article', {
          stopPropagation: false,
          probeType: 5,
          click: true,
          mouseWheel: true,
          tap: true,
          preventDefault: false,
          useTransition: false,
          bounce: {
            top: false,
          },
        })

        window.swiperScroll = swiperScroll
        swiperScroll.on('scroll', function (position) {
          var scrollTop = Math.abs(position.y)
          if (contentBroswerDisplay) {
            swiperScroll.scrollTo(0, mobileScrollY, 0)
            return false
          }
          !$('#shade').hasClass('show') &&
            $goTop[scrollTop > 500 ? 'fadeIn' : 'fadeOut']()
          changeMenusValue(scrollTop)
        })

        articleScroll.on('scroll', function (position) {
          var scrollTop = Math.abs(position.y)
          $goTop.show()
          $goTop.css({
            visibility: scrollTop > 50 ? 'visible' : 'hidden',
          })
        })
      }
      if (!window.paper_edition && !isLoaded) {
        swiperScroll.scrollTo(0, 0, 100)
        isLoaded = true
      }
      var initHeight = 0
      var $firstLi = $swiper.children().first()
      $firstLi.find('.figure').css({
        lineHeight: 'normal',
      })
      $firstLi.height('auto')
      if (!resizing) {
        $firstLi.find('img').on('load', function () {
          $.each($swiper.children(), function (index, li) {
            if (!index) {
              initHeight = $(li).height()
            }
            $(li).height(initHeight)
            $(li)
              .find('.figure')
              .css({
                lineHeight: initHeight + 'px',
              })
            $(li).find('.figure img').height(initHeight)
          })
          swiperScroll.refresh()
        })
      } else {
        $.each($swiper.children(), function (index, li) {
          $(li).find('.figure img').height('auto')
        })
        swiperScroll.refresh()
      }
      !showBox && toggleTouchMove(false)
      !contentBrowserInBody && $('body').append($contentBrowser)
      contentBrowserInBody = true
    } else {
      $.each($swiper.children(), function (index, li) {
        $(li).height('auto')
        $(li).find('.figure').css({
          lineHeight: '480px',
        })
        $(li).find('.figure img').height(480)
      })
      contentBrowserInBody = false
      $swiper.parent().append($contentBrowser)
    }
  }
  window.mobileInit = mobileInit

  $(window).on('load', function () {
    mobileInit()
    if (vw > 1200) {
      window.tvMenuRoll = $('#pc_tvmenu .weeks-list').niceScroll(rollConfig)
      window.memoryRoll = $('#memory_layer .month-list').niceScroll(rollConfig)
      articleRoll = $('#article').niceScroll({
        cursorcolor: 'rgba(68, 68, 68,.5)',
        background: 'rgba(0,0,0,.04)',
        cursorborder: 'none',
        cursoropacitymin: 1,
        railoffset: {
          top: -10 * Math.floor(vh / 900),
          left: -2,
        },
      })
      descRoll = $('#title_list').niceScroll({
        cursorcolor: 'rgba(68, 68, 68,.5)',
        background: 'rgba(0,0,0,.04)',
        cursorborder: 'none',
        cursoropacitymin: 1,
        railoffset: {
          top: -30 * Math.floor(vh / 900),
        },
      })
    }
  })

  $addDesktop.on('click', '.close', function () {
    $addDesktop.hide()
  })

  $toggle_menu.on('click', function () {
    toggleShow($(this), $('#pc_tvmenu'))
  })

  $toggle_memory.on('click', function () {
    toggleShow($(this), $memoryLayer)
    imgLazyLoad('2')
  })

  $toggle_rss.on('click', function () {
    if (vw <= 1200) {
      window.open(window.rss_url)
    } else {
      toggleShow($(this), $('#rss_pop'))
    }
  })
  $toggle_weibo.on('click', function () {
    if (vw <= 1200) {
      window.open(window.weibo_url)
    } else {
      toggleShow($(this), $('#weibo_pop'))
    }
  })

  $('#rss_tools').on('click', function () {
    vw <= 1200 && window.open(window.rss_url)
  })

  $('#weibo_tools').on('click', function () {
    vw <= 1200 && window.open(window.weibo_url)
  })

  $toggle_share.on('click', function () {
    toggleShow($(this), $('#share_layer'))
  })

  /**
   * 隐藏弹出层
   */
  function HidePop() {
    if (showBox) {
      showBox.button &&
        showBox.button.removeClass('selected').removeClass('active')
      showBox.pop && showBox.pop.removeClass('show')
    }
    toggleTouchMove(false)
    contentBroswerDisplay = false
  }

  $('body').on('mousedown', function (e) {
    window.downTarget = e.target
  })
  $('body').on('mouseup', function (e) {
    window.upTarget = e.target
  })
  $('body').on('click', function (e) {
    var $target = $(e.target)
    var ELE = e.target.tagName.toLowerCase()
    if (
      (ELE == 'div' || ELE == 'li' || ELE == 'img' || ELE == 'h1') &&
      showBox &&
      !$target.parents('#memory_layer').length &&
      !$target.parents('#pc_tvmenu').length &&
      !$target.parents('.nicescroll-rails').length &&
      !$target.parents('#paper_nav').length &&
      window.downTarget == window.upTarget
    ) {
      HidePop()
    }
  })

  /**
   * 切换menu
   * @param {Number} scrollTop
   */
  function changeMenusValue(scrollTop) {
    if (vw > 1200) {
      return false
    }

    if (!slideHeight) {
      slideHeight = $swiper.children()[0].offsetHeight + 15
    }

    var n = Math.floor(scrollTop / slideHeight)
    if (changeMenusValue.index == n) {
      return false
    }
    changeMenusValue.index = n
    currentIndex = n
    // var active = $swiper.children()[scrollToPosition ? n : n + 1]

    // if (active) {
    //   window.loadNext = true
    //   $(active).data('date') == window.memoryDate &&
    //     asyncData.fetchPageData({
    //       d: window.memoryDate,
    //       e: active.id,
    //       serviceId: 'zgdsb',
    //     })
    // } else {
    //   window.loadNext = false
    // }

    var visible = $swiper.children()[n]
    if (!visible || $(visible).hasClass('fill')) {
      return false
    }
    $(visible).addClass('active').siblings().removeClass('active')
    // $swiper.find('.visible').removeClass('visible')
    $('#pc_tvmenu').find('.selected').removeClass('selected')
    $('#pc_tvmenu')
      .find(
        'li[data-no="' +
          visible.id +
          '"][data-date="' +
          window.memoryDate +
          '"]'
      )
      .addClass('selected')
    var DESC = $(visible).data('desc')
    if (DESC) {
      $('#middle_value').html(
        '<i>' + DESC.no.toUpperCase() + DESC.title + '</i>'
      )
      descTemplate(DESC)
      $($('#paper_nav li')[n])
        .addClass('current')
        .siblings()
        .removeClass('current')
    }
    imgLazyLoad('0', 'mobile')
  }

  var slideHeight = 0

  $goTop.on('click', function () {
    // 是否底层页滚动到顶部
    scrollToPosition = true
    if ($contentBrowser.hasClass('show')) {
      articleScroll
        ? articleScroll.scrollTo(0, 0, 300)
        : $article.animate(
            {
              scrollTop: 0,
            },
            100
          )
    } else {
      // $goTop.timer && clearTimeout($goTop.timer)
      // $contentView.scrollTop(0)
      // $goTop.timer = setTimeout(function () {
      //   $contentView.scrollTop(0)
      // }, 10)
      swiperScroll.scrollTo(0, 0, 300)
    }
  })

  /**
   * 移动端功能弹层
   * @param {String} name
   */
  function toggleMobilePop(name, $this) {
    var $ele = ''
    if (showBox && !$this.hasClass('active')) {
      showBox.button.removeClass('active')
      showBox.pop.removeClass('show')
      showBox = false
    }
    $this.toggleClass('active').siblings().removeClass('active')

    switch (name) {
      case 'memory':
        $ele = $memoryLayer
        var images = $('#memory_layer img')
        images.each(function (index, item) {
          var item = $(item)
          if (item.data('echo')) {
            item.attr('src', item.data('echo'))
          }
        })
        break
      case 'menu-list':
        $ele = $('#pc_tvmenu')
        break
      case 'middle':
        $ele = $('#paper_nav')
        break
      case 'nav':
        $ele = $('#nav_layer')
        break
      case 'share':
        $ele = $('#share_layer')
        break
    }
    if ($this.hasClass('active')) {
      toggleTouchMove(true)
      contentBroswerDisplay = true
      mobileScrollY = swiperScroll.y
    } else {
      contentBroswerDisplay = false
      toggleTouchMove(false)
    }
    $ele && $ele.toggleClass('show')
    showBox = {
      button: $this,
      pop: $ele,
    }
  }

  $tabBar.on('click', 'span, em', function () {
    swiperScroll.stop()
    var $this = $(this)
    toggleMobilePop($this[0].className.split(' ')[0], $this)
  })

  $memoryLayer.on('click', '.close', HidePop)

  $memoryLayer.on('click', 'a', function (e) {
    e.preventDefault()
    var $this = $(this)
    var $active = $memoryLayer.find('.month-list .active')
    $active.removeClass('active')
    $this.addClass('active')
    baseDateReload($(this).data('date'))
  })

  /**
   * 年份滚动
   */
  function yearScroll() {
    if (yearScroll.index <= 0) {
      yearScroll.index = 0
      yearScroll.prev.addClass('disabled')
      yearScroll.next.hasClass('disabled') &&
        yearScroll.next.removeClass('disabled')
    } else if (yearScroll.index >= yearScroll.max) {
      yearScroll.index = yearScroll.max
      yearScroll.next.addClass('disabled')
      yearScroll.prev.hasClass('disabled') &&
        yearScroll.prev.removeClass('disabled')
    } else {
      yearScroll.next.hasClass('disabled') &&
        yearScroll.next.removeClass('disabled')
      yearScroll.prev.hasClass('disabled') &&
        yearScroll.prev.removeClass('disabled')
    }

    var distance = yearScroll.distance * yearScroll.index
    yearScroll.$wrap.css({
      msTransform: 'translate(-' + distance + 'px,0)',
      transform: 'translate(-' + distance + 'px,0)',
    })
  }
  yearScroll.init = function () {
    yearScroll.$wrap = $('#years_scroll')
    yearScroll.index = 0
    yearScroll.max = Math.floor($('#years_scroll').children().length / 5)
    yearScroll.prev = $('#memory_layer .prev')
    yearScroll.next = $('#memory_layer .next')
    yearScroll.distance = 475
    if (yearScroll.max == 0) {
      yearScroll.next.addClass('disabled')
    }
  }

  yearScroll.init()

  $memoryLayer.on('click', '.btn', function () {
    var $this = $(this)
    if ($this.hasClass('disabled')) {
      return false
    }
    var buttonName = $this[0].className.split(' ')[0]
    switch (buttonName) {
      case 'prev':
        yearScroll.index -= 1
        break
      case 'next':
        yearScroll.index += 1
        break
    }
    yearScroll()
  })

  // 移动端切换年份
  $years_scroll.on('click', 'span', function (e) {
    var $this = $(this)
    if ($this.hasClass('active')) {
      return false
    }
    $this.addClass('active').siblings().removeClass('active')

    if (vw <= 1200) {
      var w = $this.width() + 21
      var wrapWidth = $years_scroll.parent().width() / 2 - w
      var sl = $years_scroll.scrollLeft()
      var ol = $this[0].offsetLeft
      var distance = Math.abs(ol - sl)
      if (distance >= wrapWidth) {
        distance = sl + wrapWidth
      } else {
        distance = sl - wrapWidth
      }
      $years_scroll.animate(
        {
          scrollLeft: distance,
        },
        200
      )
    }
    asyncData.fetchMemoryData({
      // d: $this.find('var').text(),
      d: '2020',
      serviceId: 'zgdsb',
    })
  })

  $('#paper_nav').on('click', '.close', HidePop)

  /**
   * 滚动到制定报纸位置【移动端】
   * @param {Number} index
   */
  function scrollToPaper(index) {
    var active = $swiper.children()[index]
    var top = active.offsetTop - 10
    if (swiperScroll.y == top) {
      return false
    }
    scrollToPosition = true
    contentBroswerDisplay = false
    swiperScroll.scrollTo(0, -top, 0)
  }

  $('#paper_nav').on('click', 'li', function () {
    $(this)
      .addClass('current')
      .addClass('active')
      .siblings()
      .removeClass('current')
      .addClass('active')
    scrollToPaper($(this).index())
    HidePop()
    showBox = false
  })
})
