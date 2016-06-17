'use strict';
var router = require('express').Router();
var db = require('./../../../db');
var _ = require('lodash');
var User = db.model('user');
var MatchMaking = db.model('matchMaking');
var Promise = require('sequelize').Promise;



router.get('/', function(req, res, next) {

    MatchMaking.findAll({ where: { IR: true } })
        .then(function(matches) {
            res.send(matches)
        })
        .catch(next);
});

router.post('/', function(req, res, next) {

    console.log(req.body)

    var theUser = User.findById(parseInt(req.user.id));
    var thePerson = User.findById(parseInt(req.body.personId));

    var IR = !!req.body.IR;
    var promiseForUsers = Promise.all([theUser, thePerson]);

    //Search for a match where user has already been challenged by person and the pair exists in the match table
    MatchMaking.findAll({
            where: { instId: req.body.personId, challId: req.user.id }
        })
        .then(function(match) {
            console.log("+++++++++++++++++", match, match.length)

            //then if the match doesn't exists 
            if (match.length == 0) {

                //create the match in the match table
                return promiseForUsers.then(function(users) {

                        // console.log("useerrrr", users[0])
                        // console.log("useerrrr", users[1])

                        //user is inst  and other person is chall  and send users response
                        return users[0].addInst(users[1], { IR: IR });
                    })
                    .then(function(users) {
                        //match created in db successfully
                        res.status(204).send('match created')
                    })
                    .catch(next)

               //if the match exists and both want to throw down its time to fight!      
            } else if (match[0].IR && IR) {
                



            	promiseForUsers.then(users => {
                	return users[0].addChall(users[1], { CR: IR });
                })
                .tap(users => {
                	res.status(201).send(users[1]);
                })
                .catch(next);
                 //may need to send other user??

                //the match exists in database but fight hasnt been confirmed by user or person
            } else {

            	promiseForUsers.then(users => {
                	users[0].addChall(users[1], { CR: IR });
                })
                .tap(users => {
                	res.status(201).send(users[1]);
                })
                .catch(next);
            }
        });
});



router.get('/myMatches', function(req, res, next) {

    MatchMaking.findMatches(userId)
        .then(function(matches) {
            //console.log(matches);
            res.send(matches);
        })
        .catch(next)
})








module.exports = router;
