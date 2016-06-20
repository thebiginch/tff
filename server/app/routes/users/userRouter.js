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

router.get('/challengers', function(req, res, next) {

	var dataLimit = 30
	var matches = []
	var theUsers = []
	req.user.getChall()
	.then(users => {
		matches = users.map((user) => user.id)
		matches.push(req.user.id)
		theUsers = users.filter((user) => user.matchMaking.CR === null)
		dataLimit -= theUsers.length
	})
	.then(() => {
		return req.user.getInst()
	})
	.then((insts) => {
		matches = matches.concat(insts.map((inst) => inst.id))
	})
	.then(() => {
		if (dataLimit > 0) {
			return User.findAll({
				where:{
					id: {
						$notIn: matches
					}
				},
				limit: dataLimit
			})
			.then(users => {
				theUsers = users.concat(theUsers)
			})
		}
	})
	.then(function(){
		res.send(theUsers);
	})
	.catch(next);
})

router.get('/matches', function(req, res, next) {
	// var matches = []
	var theUsers = []
	req.user.getChall()
	.then(users => {
		// matches = users.map((user) => user.id)
		theUsers = users.filter((user) => user.matchMaking.CR === true)
	})
	.then(() => {
		return req.user.getInst()
	})
	.then((insts) => {
		//matches = matches.concat(insts.map((inst) => inst.id))
		var moreUsers = insts.filter((inst) => inst.matchMaking.CR === true)
		theUsers = theUsers.concat(moreUsers)
		res.send(theUsers)
	})
})


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
