const express = require('express');
const router = express.Router();
const Article = require('../controller/article');

router.post('/list', Article.list);

router.post('/add', Article.add);

router.post('/get', Article.get);

router.post('/edit', Article.edit);

router.post('/delect', Article.delect);

module.exports = router;
