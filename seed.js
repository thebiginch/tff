var chalk = require('chalk');
var db = require('./server/db');

var User = db.model('user');
var MatchMaking = db.model('matchMaking');

var Promise = require('sequelize').Promise;

var users = [{email: 'z@z.com',
        password: '123',
        location: '07079',
        searchRadius: 20,
        weight: 160,
        birthday: new Date("april 20, 1934 01:15:00"),
        minAge: 18,
        maxAge: 40},
        {email: 'a@a.com',
        password: '123',
        location: '10001',
        searchRadius: 20,
        weight: 160,
        birthday: new Date("September 10, 1970 01:15:00"),
        minAge: 18,
        maxAge: 40},
        {email: 'b@b.com',
        password: '123',
        location: '94757',
        searchRadius: 15,
        weight: 200,
        birthday: new Date("april 20, 1947 01:15:00"),
        minAge: 25,
        maxAge: 50}]
 

db.sync({})
    .then(function(){
        MatchMaking.findChallengers(2);
    })
    .then(function(what){
        console.log('whatttttt', what);
    })
    .catch(function(err){
        console.log(err);
    })
    .then(function (adminUser) {
         console.log(chalk.green('Seed successful!'));
         process.kill(0);
    });


 // db.sync({})
 //    .then(function(){
 //        users = users.map(function(tuser){
 //            return User.create(tuser);
 //        })
 //        return Promise.all(users)
 //    })
 //    .then(function(users){
 //         return users[0].getInst();
 //    })
 //    .then(function(chall){
 //        console.log("challllll", chall)
 //    })
 //    .then(function (adminUser) {
 //         console.log(chalk.green('Seed successful!'));
 //         process.kill(0);
 //    });