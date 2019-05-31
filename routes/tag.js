const express = require('express');
const router = express.Router();
const Tag = require('../controller/tag');
 

router.get('/list', Tag.list);

router.get('/add', Tag.add);

router.post('/edit', Tag.edit);

router.post('/delect', Tag.delect);

module.exports = router;
