/*
 * @Description: 搜索范围由一级目录变为二级目录
 * @Author: sungw
 * @Date: 2019-07-11 11:35:32
 * @LastEditors  : sungw
 * @LastEditTime : 2019-12-18 17:17:20
 */
const fs = require('fs')

let list = []
let PATH = './routes'
const files = fs.readdirSync(PATH)
const reg = new RegExp('.js$', '')
files.forEach(file => {
  if (reg.test(file) && file !== 'routes.js') {
    file = file.replace(/\.js$/, '')
    let obj = {
      path: file == '_index' ? '/' : `/${file}`,
      router: require(`./${file}`)
    }
    list.push(obj)
  } else if (!reg.test(file)) {
    let files_secondary = fs.readdirSync(`${PATH}/${file}`)
    files_secondary.forEach(file_secondary => {
      if (reg.test(file_secondary)) {
        file_secondary = file_secondary.replace(/\.js$/, '')
        let obj = {
          path: file_secondary == '_index' ?
            `/${file}/` :
            `/${file}/${file_secondary}`,
          router: require(`./${file}/${file_secondary}`)
        }
        list.push(obj)
      }
    })
  }
})

module.exports = list