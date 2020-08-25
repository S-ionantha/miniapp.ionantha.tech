/*
 * @Description: 
 * @Author: sungw
 * @Date: 2019-08-15 15:29:52
 * @LastEditors: sungw
 * @LastEditTime: 2020-03-16 19:22:09
 */
/**
  * Redis 实例
  * @Author: zhanpeng.zhu 
  * @Date: 2018-12-06 11:35:48 
 * @Last Modified by: zhanpeng.zhu
 * @Last Modified time: 2019-01-04 21:47:20
  * 存储的值必须为Object，不能是字符串，目前提供的方法有
    * 单条数据
      * checkItem 检查单条数据是否在Redis中 
      * getItem 从Redis中获取单条数据
      * setItem 将数据存储到Redis中
    * Hash数据
      * checkHashItem 检查Hash数据是否在Redis中 
      * getHashItem 从Redis中获取Hash数据
      * setHashItem 将Hash数据存储到Redis中
*/

var redis = require('redis')
var bluebird = require('bluebird')
var { port, host, password, preFix} = require('../conf/redis')
var Client = null

function fix(key){
  return preFix +'_'+ key
}
// 使用bluebrid全部promise话
bluebird.promisifyAll(redis)

class Redis {
  constructor() {
    Client = redis.createClient(port, host)
    Client.info((err, res) => {
      err && console.error('==连接redis失败==', err)
      console.log('==连接redis成功==')
    })
  }
    /**
   * 检索当前是否存在这个值
   * @param {String} key 
   */
  async checkItemNoFix(key) {
    try {
      let res = await Client.existsAsync(key)
      console.log('查询单条数据状态', res)
      return res
    } catch (error) {
      console.error(error)
      return false
    }
  }
  /**
   * 获取单条数据
   * @param {String} key 
   */
  async getItemNoFix(key) {
    try {
      let res = await Client.getAsync(key)
      return JSON.parse(res)
    } catch (error) {
      console.error(error)
      return false
    }
  }

  async incItemNoFix(key, total = 1) {
    let res = 0
    try {
      res = await Client.incrbyAsync(key, total)
    } catch (error) {
      console.error(error)
    }
    return res
  }

  /**
   * 设置单条数据
   * @param {String} key 
   * @param {Object} value 
   * @param {Number} expire 
   */
  async setItemNoFix(key, value, expire = 60) {
    try {
      let res = await Client.setAsync(key, JSON.stringify(value))
      await Client.expireAsync(key, expire)
      return res
    } catch (error) {
      console.error(error)
      return false
    }
  }
  /**
   * 检索当前是否存在这个值
   * @param {String} key 
   */
  async checkItem(key) {
    try {
      let res = await Client.existsAsync(fix(key))
      console.log('查询单条数据状态', res)
      return res
    } catch (error) {
      console.error(error)
      return false
    }
  }
  /**
   * 获取单条数据
   * @param {String} key 
   */
  async getItem(key) {
    try {
      let res = await Client.getAsync(fix(key))
      return JSON.parse(res)
    } catch (error) {
      console.error(error)
      return false
    }
  }

  async incItem(key, total = 1) {
    let res = 0
    try {
      res = await Client.incrbyAsync(fix(key), total)
    } catch (error) {
      console.error(error)
    }
    return res
  }

  /**
   * 设置单条数据
   * @param {String} key 
   * @param {Object} value 
   * @param {Number} expire 
   */
  async setItem(key, value, expire = 60) {
    try {
      let res = await Client.setAsync(fix(key), JSON.stringify(value))
      await Client.expireAsync(fix(key), expire)
      return res
    } catch (error) {
      console.error(error)
      return false
    }
  }
  /**
   * 获取hash表
   * @param {Object} obj 
  */
  async getHashItem(obj) {
    let { table, key } = obj
    try {
      let res = await Client.hgetAsync(fix(table), key)
      return JSON.parse(res)
    } catch (error) {
      console.error(error)
      return false
    }
  }
  /**
   * 获取hash表
   * @param {Object} obj 
  */
  async getHashAll(table) {
    try {
      let res = await Client.hgetallAsync(fix(table))
      if(res){
        for(let i in res){
          res[i] = JSON.parse(res[i] )
        }
      }
      return res
    } catch (error) {
      console.error(error)
      return false
    }
  }
  /**
   * 查询hash表状态
   * @param {Object} obj 
   */
  async checkHashItem(obj) {
    let { table, key } = obj
    try {
      let res = await Client.hexistsAsync(fix(table), key)
      console.log('查询Hash数据状态', res)
      return res
    } catch (error) {
      console.error(error)
      return false
    }
  }
  /**
   * 更新hash表
   * @param {Object} obj 
   */
  async setHashItem(obj) {
    let { table, key, value } = obj
    try {
      let res = await Client.hsetAsync(fix(table), key, JSON.stringify(value))
      return res
    } catch (error) {
      console.error(error)
      return false
    }
  }
  /**
   * hincrby 
   * @param {Object} obj 
   */
  async incrHashItem(obj) {
    let { table, key, value } = obj
    try {
      let res = await Client.hincrbyAsync(fix(table), key, parseInt(value))
      return res
    } catch (error) {
      console.error(error)
      return false
    }
  }
  /**
   * 添加set
   * @param {Object} obj 
   */
  async addSetItem(obj) {
    let { key, value } = obj
    try {
      let res = await Client.saddAsync( fix(key), value)
      return res
    } catch (error) {
      console.error(error)
      return false
    }
  }
  /**
   * 删除set
   * @param {Object} obj 
   */
  async delSetItem(obj) {
    let {  key, value } = obj
    try {
      let res = await Client.sremAsync(fix(key), value)
      return res
    } catch (error) {
      console.error(error)
      return false
    }
  }
  /**
   * 获取set
   * @param {Object} obj 
   */
  async getSetList(obj) {
    let {  key,  } = obj
    try {
      let res = await Client.smembersAsync(fix(key),)
      return res
    } catch (error) {
      console.error(error)
      return false
    }
  }
  /**
   * zincr
   * @param {Object} obj 
   */
  async zIncrItem(obj) {
    let { table, key, value } = obj
    try {
      let res = await Client.zincrbyAsync(fix(table), value, key,)
      return res
    } catch (error) {
      console.error(error)
      return false
    }
  }
  /**
   * item zrevrank
   * @param {Object} obj 
   */
  async getZRankItem(obj) {
    let { table, key, } = obj
    try {
      let res = await Promise.all([ Client.zrevrankAsync(fix(table), key, ), Client.zscoreAsync(fix(table), key, ) ]) 
      res[0] ===null ? (res[0] ='无') : res[0]  =res[0]+1
      !res[1]&&(res[1] =0)
      return res
    } catch (error) {
      console.error(error)
      return false
    }
  }
  /**
   * zset score 倒序
   * @param {Object} obj 
   */
  async getZRange(obj) {
    let { table, start, stop } = obj
    try {
      let res = await Client.zrevrangeAsync(fix(table), start, stop, 'withscores')
      return res
    } catch (error) {
      console.error(error)
      return false
    }
  }

}

module.exports = new Redis()