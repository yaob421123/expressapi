const Models = require('../config/sequelize');
const Verify = require('./verify');

module.exports = {
  // 获取 tag 列表
  async list (req, res) {
    res.json({status: -1, message: '请输入账号'});
  },

  // 新增tag
  async add (req, res) {
    let v = await Verify.index(req, res);
    if (!v) return false;
    let body = req.body;
    if (!body.name) {
      res.json({status: -1, message: '请填写标签名称'});
      return false;
    }
    const data = await Models.tag.findOne({
      where: { name: body.name }
    })
    if (!data) {
      const data = await Models.tag.create({
        name: body.name,
        iconurl: body.iconurl ? body.iconurl : ''
      });
      if (data) {
        res.json({status: 1, message: '操作成功', data: data.id})
      } else {
        res.json({status: -1, message: '操作失败'})
      }
    } else {
      res.json({status: -1, message: '当前标签已存在'})
    }
  },

  // 删除tag
  async delect (req, res) {
    let v = await Verify.index(req, res);
    if (!v) return false;
    let body = req.body;
    if (!body.id) {
      res.json({status: -1, message: 'id字段不能为空'});
      return false;
    }
    const data = await Models.tag.destroy({
      where: { id: body.id }
    });
    if (data > 0) {
      res.json({status: 1, message: '操作成功'})
    } else {
      res.json({status: -1, message: '操作失败'})
    }
  },

  // 编辑tag
  async edit (req, res) {
    let body = req.body;
    let v = await Verify.index(req, res);
    if (!v) return false;
    if (!body.id) {
      res.json({status: -1, message: 'id字段不能为空'});
      return false;
    }
    const obj = {
      name: body.name,
      iconurl: body.iconurl ? body.iconurl : ''
    };
    const data = await Models.tag.update(obj, {
      where: { id: body.id }
    })
    if (data[0] > 0) {
      res.json({status: 1, message: '操作成功'})
    } else {
      res.json({status: -1, message: '操作失败'})
    }
  },
}
