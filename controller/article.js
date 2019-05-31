const Models = require('../config/sequelize');
const Verify = require('./verify');

module.exports = {
  // 验证登录
  async list (req, res) {
  	let body = req.body;
  	if (body.type && body.type === 1) {
  		let v = await Verify.index(req, res);
    	if (!v) return false;
  	}
  	let count = body.count ? body.count : 10;
  	let currentPage = body.currentPage ? body.currentPage : 1;
  	let offset = (currentPage - 1) * count;
  	console.log(4444)
  	const data = await Models.article.findAndCountAll({
  		limit: parseInt(count),
  		offset,
  	})
    res.send({status: 1, message: '列表页', data: data});
  },

  // 新增
  async add (req, res) {
  	let v = await Verify.index(req, res);
    if (!v) return false;
  	let body = req.body;
  	if (!body.title) {
      res.json({status: -1, message: '请填写标题'});
      return false;
    }
    if (!body.content) {
      res.json({status: -1, message: '请填写内容'});
      return false;
    }
  	const data = await Models.article.create({
  		title: body.title,
  		typeid: body.typeid,
  		type: body.type,
  		content: body.content
  	});
  	if (data) {
  		res.json({status: 1, message: '操作成功', data: data.id})
  	} else {
  		res.json({status: -1, message: '操作失败'})
  	}
  },

  // 获取文章
  async get (req, res) {
  	let body = req.body;
  	if (body.type && body.type === 1) {
  		let v = await Verify.index(req, res);
    	if (!v) return false;
  	}
  	if (!body.id) {
      res.json({status: -1, message: 'id字段不能为空'});
      return false;
    }
  	const data = await Models.article.findOne({
      where: { id: body.id }
    })
    if (data) {
      res.json({status: 1, message: '操作成功', data: data})
    } else {
      res.json({status: -1, message: '文章不存在'})
    }
  },

  // 编辑文章
  async edit (req, res) {
    let body = req.body;
    let v = await Verify.index(req, res);
    if (!v) return false;
    if (!body.id) {
      res.json({status: -1, message: 'id字段不能为空'});
      return false;
    }
    const obj = {
    	id: body.id,
      title: body.title,
  		typeid: body.typeid,
  		type: body.type,
  		content: body.content
    };
    const data = await Models.article.update(obj, {
      where: { id: body.id }
    })
    if (data[0] > 0) {
      res.json({status: 1, message: '操作成功'})
    } else {
      res.json({status: -1, message: '用户id不存在'})
    }
  },

  // 删除文章
  async delect (req, res) {
    let v = await Verify.index(req, res);
    if (!v) return false;
    let body = req.body;
    if (!body.id) {
      res.json({status: -1, message: '文章id不存在'});
      return false;
    }
    const data = await Models.article.destroy({
      where: { id: body.id }
    });
    if (data > 0) {
      res.json({status: 1, message: '操作成功'})
    } else {
      res.json({status: -1, message: '操作失败'})
    }
  },
}
