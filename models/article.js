const moment = require('moment');

module.exports = function(sequelize, DataTypes){
  return sequelize.define("article", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(250),
      comment: '标题'
    },
    type: {
      type: DataTypes.STRING(30),
      comment: '类型'
    },
    typeid: {
      type: DataTypes.STRING(30),
      comment: '类型id'
    },
    content: {
      type: DataTypes.TEXT,
      defaultValue: '',
      comment: '内容'
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
    }
  },{
    comment:'文章列表',
    timestamps: true,
    updatedAt: 'update_at',
    createdAt: 'create_at',
    freezeTableName: true
  })
}