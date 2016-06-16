'use strict';
var router = require('express').Router();
var db = require('./../../../db');

var User = db.model('user');
var MatchMaking = db.model('matchMaking');




router.get('/',function(req,res,next){

	MatchMaking.findAll({})
	.then(function(matches){

		console.log(matches)
		res.send(matches)
	})
	.catch(next);
});

router.post('/:userId',function(req,res,next){

	MatchMaking.findOrCreate({where: {instId: req.params.userId,
									challId: req.body.challId}})
				.then(function(match){
					console.log(match)
					res.send(match);
				})
				.catch(next);

});


module.exports = router;