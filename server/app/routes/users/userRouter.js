'use strict';
var router = require('express').Router();
var db = require('./../../../db');

var User = db.model('user');
//var MatchMaking = db.model('matchMaking');

router.get('/',function(req,res,next){

	User.findAll({})
		.then(function(users){
			res.send(users);
		})
		.catch(next);
});

router.get('/:userId',function(req,res,next){

	User.findById(req.params.userId)
		.then(function(users){
			res.send(users);
		})
		.catch(next);
});

router.post('/', function(req,res,next){

	User.create({})

});

module.exports = router;
