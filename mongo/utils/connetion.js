/*
 * @Description: 
 * @Author: sungw
 * @Date: 2019-08-08 18:46:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-27 11:39:25
 */

// mssql
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Mongoose = require('mongoose')
let mssqlConfig = require('../config/mssql')
const mongoConfig = require('../config/mongo')
const mongoCmsConfig = require('../config/mongo_cms')
const mongoDetailConfig = require('../config/mongo_detail')
const mongoTopicConfig = require('../config/mongo_topic')
const mongoWeiChaiConfig = require('../config/mongo_weichai')
const mariadbConfig = require('../config/mariadb')
const mariadbTopicConfig = require('../config/mariadb_topic')
const mariadbDealerConfig = require('../config/mariadb_dealer')
const mariadbCMSConfig = require('../config/mariadb_cms')
const mariadbMallConfig = require('../config/mariadb_mall')
const env = 'dev'

Mongoose.set('useCreateIndex', true)
class Connetion {
  constructor() {}
  mssql() { // SqlServer
    let { database, user, password, server, ip } = mssqlConfig
    return new Sequelize(database, user, password, {
      encrypt: true,
      host: env === 'dev' ? server : ip,
      dialect: 'mssql',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      define: {
        //prevent sequelize from pluralizing table names
        timestamps: false,
        freezeTableName: true
      },
      logging: false,
      freezeTableName: true,
      operatorsAliases: {
        $and: Op.and,
        $or: Op.or,
        $any: Op.any,
        $eq: Op.eq,
        $gt: Op.gt,
        $lt: Op.lt,
        $lte: Op.lte,
        $like: Op.like,
        $not: Op.not,
        $between: Op.between
      }
    })
  }
  mongo() { // mongoDB
    let { host, port, username, password, options, database } = mongoConfig
    return Mongoose.createConnection(`mongodb://${username}:${password}@${host}:${port}/${database}`, options)
  }
  maria() { //mariadb
    let { database, user, password, host, port, server, ip } = mariadbConfig
    return new Sequelize(database, user, password, {
      encrypt: true,
      host: host, //env === 'dev' ? server : ip,
      dialect: 'mariadb',
      port: port,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      define: {
        //prevent sequelize from pluralizing table names
        timestamps: false,
        freezeTableName: true
      },
      timezone: '+08:00',
      logging: process.env.NODE_ENV=='production'? false: console.log,
      benchmark: true,
      query: {
        // raw: true,
        nest: true
      },
      operatorsAliases: {
        $and: Op.and,
        $or: Op.or,
        $in: Op.in,
        $any: Op.any,
        $eq: Op.eq,
        $gt: Op.gt,
        $gte: Op.gte,
        $lt: Op.lt,
        $lte: Op.lte,
        $like: Op.like,
        $not: Op.not,
        $between: Op.between
      }
    })
  }
  maria_topic() { //mariadb
    let { database, user, password, host, port, server, ip } = mariadbTopicConfig
    return new Sequelize(database, user, password, {
      encrypt: true,
      host: host, //env === 'dev' ? server : ip,
      dialect: 'mariadb',
      port: port,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      define: {
        //prevent sequelize from pluralizing table names
        timestamps: true,
        freezeTableName: true
      },
      timezone: '+08:00',
      logging: process.env.NODE_ENV=='production'? false: console.log,
      benchmark: true,
      query: {
        // raw: true,
        nest: true
      },
      operatorsAliases: {
        $and: Op.and,
        $or: Op.or,
        $in: Op.in,
        $any: Op.any,
        $eq: Op.eq,
        $gt: Op.gt,
        $gte: Op.gte,
        $lt: Op.lt,
        $lte: Op.lte,
        $like: Op.like,
        $not: Op.not,
        $between: Op.between
      }
    })
  }
  maria_dealer() { //mariadb
    let { database, user, password, host, port, server, ip } = mariadbDealerConfig
    return new Sequelize(database, user, password, {
      encrypt: true,
      host: host, //env === 'dev' ? server : ip,
      port: port,
      dialect: 'mariadb',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      define: {
        //prevent sequelize from pluralizing table names
        timestamps: true,
        underscored: true,
        charset: 'utf8mb4',
        freezeTableName: true
      },
      timezone: '+08:00',
      logging: process.env.NODE_ENV=='production'? false: console.log,
      benchmark: true,
      query: {
        // raw: true,
        raw: false,
        nest: true
      },
      operatorsAliases: {
        $and: Op.and,
        $or: Op.or,
        $in: Op.in,
        $any: Op.any,
        $eq: Op.eq,
        $gt: Op.gt,
        $gte: Op.gte,
        $lt: Op.lt,
        $lte: Op.lte,
        $like: Op.like,
        $not: Op.not,
        $between: Op.between
      }
    })
  }
  maria_cms() { //mariadb
    let { database, user, password, host, port, server, ip } = mariadbCMSConfig
    return new Sequelize(database, user, password, {
      encrypt: true,
      host: host, //env === 'dev' ? server : ip,
      port: port,
      dialect: 'mariadb',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      define: {
        //prevent sequelize from pluralizing table names
        timestamps: false,
        charset: 'utf8mb4',
        freezeTableName: true
      },
      timezone: '+08:00',
      logging: process.env.NODE_ENV=='production'? false: console.log,
      benchmark: true,
      query: {
        nest: true
      },
      operatorsAliases: {
        $and: Op.and,
        $or: Op.or,
        $in: Op.in,
        $any: Op.any,
        $eq: Op.eq,
        $gt: Op.gt,
        $gte: Op.gte,
        $lt: Op.lt,
        $lte: Op.lte,
        $like: Op.like,
        $not: Op.not,
        $between: Op.between
      }
    })
  }
  maria_mall() { //mariadb
    let { database, user, password, host, port, server, ip } = mariadbMallConfig
    return new Sequelize(database, user, password, {
      encrypt: true,
      host: host, //env === 'dev' ? server : ip,
      port: port,
      dialect: 'mariadb',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      define: {
        //prevent sequelize from pluralizing table names
        timestamps: false,
        charset: 'utf8mb4',
        freezeTableName: true
      },
      timezone: '+08:00',
      logging: process.env.NODE_ENV=='production'? false: console.log,
      benchmark: true,
      query: {
        // nest: true
      },
      operatorsAliases: {
        $and: Op.and,
        $or: Op.or,
        $in: Op.in,
        $any: Op.any,
        $eq: Op.eq,
        $gt: Op.gt,
        $gte: Op.gte,
        $lt: Op.lt,
        $lte: Op.lte,
        $like: Op.like,
        $not: Op.not,
        $between: Op.between
      }
    })
  }
}

module.exports = new Connetion