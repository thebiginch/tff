'use strict';
var router = require('express').Router();
var db = require('./../../../db');

var User = db.model('user')

var ensureAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()) {
	   next();
	} else {
	   res.status(401).end();
	}
};

router.get('/',function(req,res,next){

	User.findAll({limit:30})
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

	// MatchMaking.findUsers(102)
 // 	.then(users => res.send(users))

 });

 router.delete('/',ensureAuthenticated, function(req,res,next){

 	User.findById(req.user.id)
	.then(user=>user.destroy())
	.then(()=>res.status(204).send('deleted successfully'))
	.catch(next);

});

module.exports = router;
