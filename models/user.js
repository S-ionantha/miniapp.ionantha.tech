const { getItem, getList, updateItem } = require('../mongo/model/user')
// const mManager = require('../../privateCloud/models/cms/MManagerFeedService')
// const managers = require('../config/managers')
const _ = require('lodash')
const defaultUserInfo = {
  _id: `err_user_${+new Date()}`,
  headimgurl:
    'http://thirdwx.qlogo.cn/mmopen/vi_32/W2b1C5IahNcB1wOyuyyN5R6MLgwCnvkFuzkgpgibyrpNLs3Wc8Z2X9YTWRF62icv9sL3iaVHt0yeQLQgRWqtia1OmA/132',
  nickname: 'e族卡友',
}
const model = {
  async getUser(querySelector) {
    // let { openid, _id, unionid } = obj
    let { data } = await getItem(querySelector)
    !data && (data = defaultUserInfo)
    data['id'] = data['_id']
    return _.pick(data, ['id', 'nickname', 'headimgurl', 'phone', 'unionid', 'openid'])
  },
  async getUserInfo(querySelector) {
    let data = await model.getUser(querySelector)
    return _.pick(data, ['id', 'nickname', 'headimgurl'])
  },
  async updateUserInfo(_id, newValue) {
    newValue = _.pick(newValue, ['nickname', 'headimgurl', 'pwd'])
    let { data } = await updateItem({ querySelector: { _id }, newValue })
    return !!data[0]
  },

  async getXNUserList(resList = []) {
    try {
      let resData = await getList({
        querySelector: {
          openid: /oo4C-XN_/,
        },
        size: 818,
      })
      let { data } = resData
      resList = data
    } catch (error) {
      console.error('获取虚拟用户失败', error)
    }
    return resList
  },
  // checkManager(uid) {
  //   return managers.indexOf(uid) >= 0 ? 1 : 0
  // },
  // async checkManager(uid,isAdmin =false){
  //   let querySelector = {uid,status:true}
  //   if(isAdmin){
  //     querySelector.isAdmin =true
  //   }
  //   let {data} = await mManager.getItem(querySelector)
  //   return data ?1:0
  // },
  async fillXNUsers(data = [], count = 1) {
    let XNUsers = await MODEL.getXNUserList()
    let start = data.length
    let n = count - start
    let _data = XNUsers.splice(start, n).map(item => {
      let { _id: uid, headimgurl: avatar, nickname } = item
      return {
        uid,
        avatar,
        nickname,
      }
    })
    return [...data, ..._data]
  },
  async addUser(openid, newValue) {
    try {
      let { status } = await updateItem({
        querySelector: {
          openid,
        },
        newValue,
      })
      return status
    } catch (error) {
      return true
    }
  },
  async managerSearchUser(nickname,page){
    let info = await getList({querySelector:{nickname:{$regex:nickname},bususer:0},page})
    if(info.data){
      info.data = [...info.data].map(item=>{
        let { _id:uid,nickname,headimgurl} = item
        return {uid,nickname,headimgurl }
      })
    }
    return info
  },
  // async getManagerList(){
  //   let info = await mManager.getList({querySelector:{}})
  //   if(info.status ==0){
  //     info.data  =await Promise.all([...info.data].map(async item=>{
  //       let { uid,status,name,remark,isAdmin} = item 
  //       let data = await model.getUserInfo({_id:uid})
  //       let { nickname,headimgurl} =data
  //       return { uid , status, nickname,headimgurl,name,remark,isAdmin}
  //     })) 
  //   }
  //   return info 
  // },
  // async upsertManager(uid,newValue={}){
  //  let info =  await mManager.updateItem({querySelector:{uid},newValue})
  //  return info
  // }
}
module.exports = model
