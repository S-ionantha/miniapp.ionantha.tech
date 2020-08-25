module.exports = {
  onSuccess: function(data) {
    return data ? { status: 0, data } : { status: 0, errMsg: '请求成功' }
  },
  onError: function(errMsg) {
    return { status: -1, errMsg }
  },
  ERROR: {
    SERVER: {
      status: 500,
      errMsg: '服务器错误',
    },
    PARAM: {
      status: 300,
      errMsg: '参数错误',
    },
  },
}
