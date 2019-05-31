const moment = require('moment');

module.exports = function(sequelize, DataTypes){
  return sequelize.define("tag", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(30),
      comment: '标签名称'
    },
    iconurl: {
      type: DataTypes.STRING(255),
      defaultValue: '',
      comment: '标签图标'
    },
    Number: {
      type: DataTypes.INTEGER,
      comment: '文章数量'
    }
  },{
    comment:'标签',
    timestamps: false,
    freezeTableName: true
  })
}