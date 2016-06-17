var router = require('express').Router();
module.exports = router;
var _ = require('lodash');

var db = require('./_db');
var User = db.model('user');
var matchMaking = db.model('matchMaking');

router.get('/:userId', function(req, res, next) {
  res.send(matchMaking.findChallengers(req.params.userId))
})
