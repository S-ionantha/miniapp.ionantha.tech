
const utils = {
  errorHandle(msg) {
    return {
      status: 1,
      errMsg: msg
    }
  },
  objectToArray(o) {
    let tempOrder = []
    for (var i in o) {
      let arr = []
      arr.push(i, o[i] == 1 ? 'ASC' : 'DESC')
      tempOrder.push(arr)
    }
    return tempOrder
  },
  defaultPage: 0,
  defaultSize: 20,
}

module.exports = utils