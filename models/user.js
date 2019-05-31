const moment = require('moment');

module.exports = function(sequelize, DataTypes){
  return sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(30),
      comment: '账号'
    },
    password: {
      type: DataTypes.STRING(100),
      defaultValue: '',
      comment: '密码'
    },
    mobile: {
      type: DataTypes.STRING(11),
      defaultValue: '',
      comment: '手机号'
    },
    name: {
      type: DataTypes.STRING(50),
      defaultValue: '',
      comment: '昵称'
    },
    auth: {
      type: DataTypes.INTEGER(10),
      defaultValue: 1,
      comment: '权限控制'
    },
    create_at: {
      type: DataTypes.DATE,
      comment: '创建时间',
      get() {
        return moment(this.getDataValue('create_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    update_at: {
      type: DataTypes.DATE,
      comment: '更新时间',
      get() {
        return moment(this.getDataValue('update_at')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    usertoken: {
      type: DataTypes.STRING(255),
      defaultValue: '',
      comment: '用户token'
    }
  },{
    comment:'用户表',
    timestamps: true,
    updatedAt: 'update_at',
    createdAt: 'create_at',
    freezeTableName: true
  })
}