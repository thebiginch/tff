'use strict';
var router = require('express').Router();
var db = require('./../../../db');

var User = db.model('user');
var MatchMaking = db.model('matchMaking')

var Promise = require('sequelize').Promise
var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};


router.get('/',function(req,res,next){

	req.user.id = 102
	MatchMaking.findBouts(req.user.id)
		.then(function(matches){

			var users = matches.map(match => User.findById(match.instId))
			return Promise.all(users);
		})
		.then(users =>{

			res.send(users)

		})
		.catch(next);
	

});

router.get('/:userId',function(req,res,next){

	User.findById(req.params.userId)
		.then(function(user){
			res.send(user);
		})
		.catch(next);
});

router.get('/:userId/settings',function(req,res,next){

	User.findById(req.params.userId)
	.then(user =>{


	});
})

//route for testing 
router.post('/', function(req,res,next){

	MatchMaking.findUsers(102)
	.then(users => res.send(users))

});

router.delete('/',ensureAuthenticated, function(req,res,next){

	User.findById(req.user.id)
		.then(user=>user.destroy())
		.then(()=>res.status(204).send('deleted successfully'))
		.catch(next);

});

module.exports = router;
