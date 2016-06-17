var chalk = require('chalk');
var db = require('./server/db');

var User = db.model('user');
var matchMaking = db.model('matchMaking');

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

        var matches = [{
         IR: true,
         instId: 3,
         challId: 1
       }, {
         IR: true,
         instId: 2,
         challId: 1
       }]
           db.sync({force: true})
             .then(function() {
               seedUsers = users.map(function(user) {
                 return User.create(user)
               })
               return Promise.all(seedUsers)
             })
             .then(function(users) {
               users[0].setInst(users[1])
               users[0].setInst(users[2])
            //  seedMatches = matches.map(function(match) {
            //       return matchMaking.create(match)
            //   })
            //   return Promise.all(seedMatches)
              // .then(function(matches) {
              //  //  console.log(matches, users)
              //  //  users[0].addInst(users[1])
              //  //  matches[0].addInst(users[0])
              //  //  matches[1].addInst(users[0])
              // })
           })
           .then(function() {
             console.log(chalk.green('Seed successful!'));
                    //  process.kill(0);
           })

    // db.sync({})
    //     .then(function(){
    //         return matchMaking.findInstigators(1);
    //     })
    //     .then(function(what){
    //         console.log(what)
    //     })
    //     .catch(function(err){
    //         console.log(err);
    //     })
    //     .then(function (adminUser) {
    //          console.log(chalk.green('Seed successful!'));
    //          process.kill(0);
    //     });

 //
 // db.sync({})
 //    .then(function(){
 //      return User.findById(1);
 //    })
 //    .then(function(user){
 //        return user.getInst({where: {IR: true}});
 //    })
 //    .then(function(chall){
 //        console.log("challllll", chall[0])
 //    })
 //    .then(function (adminUser) {
 //         console.log(chalk.green('Seed successful!'));
 //         process.kill(0);
 //    });
