'use strict';
var router = require('express').Router();
var db = require('./../../../db');

var User = db.model('user');
var MatchMaking = db.model('matchMaking')
var Promise = require('sequelize').Promise

router.get('/',function(req,res,next){

	// User.findAll({limit:30})
	// 	.then(function(users){
	// 		res.send(users);
	// 	})
	// 	.catch(next);
	MatchMaking.findBouts(req.user.id)
		.then(function(matches){

			var users = matches.map(match => User.findById(match.challId))
			return Promise.all(users);
		})
		.then(users => res.send(users))
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
