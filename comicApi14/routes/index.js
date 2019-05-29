var express = require('express');
var router = express.Router();

router.use('/auth', require('./auth/index'));
router.use('/soptoon', require('./soptoon/index'));

module.exports = router;