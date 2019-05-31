/**
 * Sequelize 配置文件
 */
var Sequelize = require("sequelize");
var fs = require("fs");
var path = require("path");
var Models = {};

/**
 * 初始化
 */
var sequelize = new Sequelize(
  'blog',          // 数据库名
  'root',          // 用户名
  'root',          // 用户密码
  {
    'host': 'localhost',      // 数据库服务器ip
    'dialect': 'mysql',   // 数据库使用mysql
    'port': 3306,      // 数据库服务器端口
    'pool': {
      max: 5,
      min: 0,
      idle: 10000
    },
    "timezone": '+08:00',
    'define': {
      'underscored': true,
      "charset": "utf8mb4",
      "collate": "utf8mb4_unicode_ci",
      "supportBigNumbers": true,
      "bigNumberStrings": true,
    },
    "benchmark": true,
  }
);

/**
 * 导出 sequelize
 */
Models.sequelize = sequelize;

/**
 * sequelize 链接测试
 */
sequelize.authenticate().then(function () {
  console.log('> sequelize 链接成功');
}).catch(function (err) {
  console.log('> sequelize 链接失败', err);
});

/**
 * 导入模型，并导出模块
 */
fs.readdirSync(path.resolve(__dirname, '../models')).forEach(function (file) {
  var model = sequelize.import(path.resolve(__dirname, '../models', file));
  Models[model.name] = model;
});

/**
 * 同步模型
 */
sequelize.sync().then(function () {
  console.log('> sequelize 同步成功')
}).catch(function (err) {
  console.log('> sequelize 同步失败')
})

module.exports = Models;
