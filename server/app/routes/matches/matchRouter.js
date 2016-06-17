'use strict';
var router = require('express').Router();
var db = require('./../../../db');

var User = db.model('user');
var MatchMaking = db.model('matchMaking');
var Promise = require('sequelize').Promise;



router.get('/',function(req,res,next){

	MatchMaking.findAll({})
	.then(function(matches){

		console.log(matches)
		res.send(matches)
	})
	.catch(next);
});

router.post('/:userId',function(req,res,next){


	var chall = User.findById(parseInt(req.body.challId));
	var inst = User.findById(parseInt(req.params.userId));

	Promise.all([chall,inst])
		.spread(function(chall,inst){
			return inst.setChall(chall)
		})
		.then(function(what){
			res.send(what);
		})
		.catch(next)
});


module.exports = router;