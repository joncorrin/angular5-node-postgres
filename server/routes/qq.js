var express = require('express');
var router = express.Router();
var qqController = require('../controllers').qq;

router.post('/server/authorize', async function(req,res,next) {
  return qqController.authorize(req,res);
});


module.exports = router;
