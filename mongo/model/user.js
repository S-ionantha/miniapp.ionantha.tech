/*
 ** 用户相关服务
 * @Author: zhanpeng.zhu 
 * @Date: 2018-11-27 20:36:25 
 * @Last Modified by:   zhanpeng.zhu 
 * @Last Modified time: 2018-11-27 20:36:25 
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { mongo } = require('../utils/connetion')
const {dbname, tablename, fileds, order} = require('../schemas/user')
const { errorHandle } = require('../utils')

const USER_DB = mongo(dbname)
const USER_SCHEMA = new Schema(fileds, {
  timestamps: true
})

// 用户模型
const USER_MODEL = USER_DB.model(tablename, USER_SCHEMA)

class UserFeedService {

  // 获取用户列表
  async getList (enterObject){
    const errMsg = '查询用户列表错误'
    let responseData = errorHandle(errMsg)

    let { querySelector, page, sort, size } = enterObject
    size = size || 20
    page = page || 0

    let defaultQueryObject = {}
    
    sort = sort || order

    querySelector && Object.assign(defaultQueryObject, querySelector)
    
    try {
      
      
      let data = await USER_MODEL.find(defaultQueryObject)
      .sort(sort)
      .skip(page * size)
      .limit(size)
      responseData = {
        status: 0,
        data
      }
      // 如果查询第一页返回数据总数
      if(page == 0){
        let total = await USER_MODEL.find(defaultQueryObject).countDocuments()
        responseData['total'] = total
      }
    } catch (error) {
      console.error(errMsg, error)
    }
    return responseData  
  }

  // 获取用户信息
  async getItem (querySelector){
    const errMsg = '查询用户信息错误'
    let responseData = errorHandle(errMsg)
    try {
      let data = await USER_MODEL.findOne(querySelector)
      responseData = {
        status: 0,
        data
      }
    } catch (error) {
      console.error(errMsg, error)
    }
    return responseData 
  }

  // 新增&更新用户信息
  async updateItem (updateObject){
    let { querySelector, newValue } = updateObject
    const errMsg = ' 新增&更新用户信息错误'
    let responseData = errorHandle(errMsg)
    
    try {
      let data = await USER_MODEL.updateOne(
        querySelector,
        {
          $set: newValue,
        },
        {
          upsert: true
        }
      )
      responseData = {
        status: 0,
        data
      }
    } catch (error) {
      console.error(errMsg, error)
    }
    return responseData 
  }

}

module.exports = new UserFeedService