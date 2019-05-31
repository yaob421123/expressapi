const express = require('express');
const router = express.Router();
const User = require('../controller/user');
 
router.post('/addUser', User.addUser);

router.post('/getUser', User.getUser);

router.get('/editUser', User.editUser);

router.get('/delectUser', User.delectUser);

router.post('/login', User.login);

router.get('/loginout', User.loginout);

router.get('/rePasswd', User.rePasswd);

router.get('/verify', User.verify);

module.exports = router;





// var Mock = require('mockjs');
// router.get('/ceshi', function(req, res, next) {
//   res.json(Mock.mock({
//     message: '',
//     "data|10": [{   // 随机生成1到3个数组元素
//       'name': '@cname',  // 中文名称
//       'id|+1': 88,    // 属性值自动加 1，初始值为88
//       'age|18-28': 0,   // 18至28以内随机整数, 0只是用来确定类型
//       'birthday': '@date("yyyy-MM-dd")',  // 日期
//       'city': '@city(true)',   // 中国城市
//       'color': '@color',  // 16进制颜色
//       'isMale|1': true,  // 布尔值
//       'isFat|1-2': true,  // true的概率是1/3
//       'brother|1': ['jack', 'jim'], // 随机选取 1 个元素
//       'sister|+1': ['jack', 'jim', 'lily'], // array中顺序选取元素作为结果
//       'friends|2': ['jack', 'jim'] // 重复2次属性值生成一个新数组
//     },{
//         'gf': '@cname'
//     }],
//     status: 1
//   }));
// });