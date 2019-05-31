const Jwt = require('jsonwebtoken');
const Models = require('../config/sequelize');
const Session = require('../utils/session');
const Utils = require('../utils/index');
const Crypyo = require('../utils/crypto');
const Config = require('../config/config');
const Verify = require('./verify');

module.exports = {
  // 新增用户
  async addUser (req, res) {
    let v = await Verify.index(req, res);
    if (!v) return false;
    let body = req.body;
    if (!body.username) {
      res.json({status: -1, message: '请输入账号'});
      return false;
    }
    if (!body.password) {
      res.json({status: -1, message: '请输入密码'});
      return false;
    }
    const finduser = await Models.user.findAll({
      where: { username: body.username }
    });
    if (finduser.length > 0) {
      res.json({status: -1, message: '用户已存在'});
      return false;
    }
    if (body.mobile && !Utils.isPhoneNo(body.mobile)) {
      res.json({status: -1, message: '请输入正确的手机号'});
      return false;
    }
    body.password = Crypyo.getSha1(body.password);
    const data = await Models.user.create(body);
    if (data) {
      let user = {
        id: data.id,
        username: data.username,
        name: data.name,
        mobile: data.mobile,
        auth: data.auth
      }
      res.json({status: 1, message: '操作成功', data: user})
    } else {
      res.json({status: 1, message: '操作失败'})
    }
  },

  // 查用户信息
  async getUser (req, res) {
    let v = await Verify.index(req, res);
    if (!v) return false;
    if (!req.body.id) {
      res.json({status: -1, message: 'id字段不能为空'});
      return false;
    }
    const data = await Models.user.findOne({
      where: { id: req.body.id }
    })
    if (data) {
      let user = {
        id: data.id,
        username: data.username,
        name: data.name,
        mobile: data.mobile,
        auth: data.auth
      }
      res.json({status: 1, message: '操作成功', data: user})
    } else {
      res.json({status: -1, message: '用户不存在'})
    }
  },

  // 编辑用户
  async editUser (req, res) {
    let v = await Verify.index(req, res);
    if (!v) return false;
    let body = req.body;
    if (!body.id) {
      res.json({status: -1, message: 'id字段不能为空'});
      return false;
    }
    const obj = {
      password: body.password,
      mobile: body.mobile,
      name: body.name,
      content: body.content
    };
    const data = await Models.user.update(obj, {
      where: { id: body.id }
    })
    if (data[0] > 0) {
      res.json({status: 1, message: '操作成功'})
    } else {
      res.json({status: -1, message: '用户id不存在'})
    }
  },

  // 删除用户
  async delectUser (req, res) {
    let v = await Verify.index(req, res);
    if (!v) return false;
    let body = req.body;
    if (!body.id) {
      res.json({status: -1, message: '用户id不存在'});
      return false;
    }
    const data = await Models.user.destroy({
      where: { id: body.id }
    });
    if (data > 0) {
      res.json({status: 1, message: '操作成功'})
    } else {
      res.json({status: -1, message: '操作失败'})
    }
  },

  // 登录
  async login (req, res) {
    const body = req.body;
    if (!body.username) {
      res.json({status: -1, message: '请输入账号'});
      return false;
    }
    if (!body.password) {
      res.json({status: -1, message: '请输入密码'});
      return false;
    }
    const data = await Models.user.findOne({
      where: { username: body.username }
    });
    if (data) {
      if (data.password !== Crypyo.getSha1(body.password)) {
        res.json({status: -1, message: '账号密码错误'})
        return false;
      }
      let token = await Jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 3),
        data: data.id,
      }, Config.TOKEN_KEY);
      const setToken = await Models.user.update({
        usertoken: token
      }, {
        where: { id: data.id }
      })
      if (setToken[0] > 0) {
        let user = {
          userid: data.id,
          username: data.username,
          name: data.name,
          mobile: data.mobile,
          auth: data.auth,
          token: token
        }
        res.json({status: 1, message: '登录成功', data: user})
      } else {
        res.json({status: -1, message: '操作失败'})
      }
    } else {
      res.json({status: -1, message: '用户不存在'})
    }
  },

  // 验证登录
  async verify (req, res) {
    let token = req.headers.token;
    if (!token) {
      res.json({status: -600, message: '用户未登录'});
      return false;
    }
    Jwt.verify(token, Config.TOKEN_KEY, (err, decode) => {
      if (err) {
        res.send({status: -600, message: '签名已失效'});
        return false;
      } else {
        Models.user.findOne({
          where: { id: decode.data }
        }).then(response => {
          if (response && response.id === decode.data && response.usertoken === token) {
            res.json({status: 1, message: '验证通过', data: response.id})
          } else {
            res.json({status: -600, message: '签名无效'})
            return false;
          }
        }).catch(error => {
          res.send({status: -600, message: '签名无效'});
          return false;
        })
      }
    })
  },

  // 退出登录
  async loginout (req, res) {
    let v = await Verify.index(req, res);
    if (!v) return false;
    let token = req.headers.token;
    if (!token) {
      res.json({status: -600, message: '用户已退出登录'});
      return false;
    } else {
      Jwt.verify(token, Config.TOKEN_KEY, (err, decode) => {
         Models.user.update({
          usertoken: ''
        }, {
          where: { id: decode.data }
        }).then(response => {
          res.send({status: -600, message: '用户已退出登录'});
        }).catch(error => {
          res.send({status: -600, message: '用户已退出登录'});
        })
      })
    }
  },
  
  // 修改密码
  async rePasswd (req, res) {
    let v = await Verify.index(req, res);
    if (!v) return false;
    let body = req.body;
    if (!body.id) {
      res.json({status: -1, message: 'id字段不能为空'});
      return false;
    }
    if (!body.password1) {
      res.json({status: -1, message: '请填写原密码'});
      return false;
    }
    if (!body.password2) {
      res.json({status: -1, message: '请填写新密码'});
      return false;
    }
    const data = await Models.user.findOne({
      where: { id: req.body.id }
    })
    if (data) {
      if (data.password !== body.password1) {
        res.json({status: -1, message: '原密码错误'})
        return false;
      }
      const obj = {
        password: Crypyo.getSha1(body.password2)
      };
      const data = await Models.user.update(obj, {
        where: { id: body.id }
      })
      if (data[0] > 0) {
        res.json({status: 1, message: '操作成功'})
      } else {
        res.json({status: -1, message: '用户id不存在'})
      }
      res.json({status: 1, message: '操作成功', data: user})
    } else {
      res.json({status: -1, message: '用户不存在'})
    }
  }
}
