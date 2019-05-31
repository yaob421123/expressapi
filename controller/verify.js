const Jwt = require('jsonwebtoken');
const Models = require('../config/sequelize');
const Config = require('../config/config');

module.exports = {
  // 验证登录
  index (req, res) {
    let token = req.headers.token;
    if (!token) {
      res.json({status: -600, message: '用户未登录', data: {}});
      return false;
    }
    return new Promise((resolve, reject) => {
      Jwt.verify(token, Config.TOKEN_KEY, (err, decode) => {
        if (err) {
          res.send({status: -600, message: '签名已失效0'});
          return false;
        } else {
          Models.user.findOne({
            where: { id: decode.data }
          }).then(response => {
            if (response && response.id === decode.data && response.usertoken === token) {
              resolve(true);
            } else {
              res.json({status: -600, message: '签名无效1' })
            }
          }).catch(error => {
            res.send({status: -600, message: '签名无效2'});
          })
        }
      })
    })
  }
}
