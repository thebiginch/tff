var chalk = require('chalk');
var db = require('./server/db');

var User = db.model('user');

var Promise = require('sequelize').Promise;

var users = [{email: 'butt@b.com',
            password: '123' ,
            isAdmin: false,
        }]
 

var createAdmin = function(){
        return User.create({
        email: 'admin@admin.taco',
        password: 'towel',
        isAdmin: true
    })
}




 db.sync({ force: true })
    .then(function(){
        return createAdmin();
    })
    .then(function(admin){
       return User.create(users[0])
        .then(function(user){
            return admin.setChall(user);
        })
        .then(function(match){

        })
    })
    .then(function(match){
        console.log(match)
    })
    .then(function (adminUser) {
         console.log(chalk.green('Seed successful!'));
         process.kill(0);
    });