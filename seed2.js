'use strict';

var chance = require('chance')(432);
var Promise = require('bluebird');

var chalk = require('chalk');
var db = require('./server/db');

var User = db.model('user');
var matchMaking = db.model('matchMaking');


var numUsers = 100;
var numStories = 500;

var emails = chance.unique(chance.email, numUsers);

function doTimes (n, fn) {
  var results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

function randPhoto () {
  var g = chance.pick(['men', 'women']);
  var n = chance.natural({
    min: 0,
    max: 96
  });
  return 'http://api.randomuser.me/portraits/' + g + '/' + n + '.jpg'
}

function randUser () {

  var year = chance.year({min:1952, max: 1997});

  return User.build({
    name: [chance.first(), chance.last()].join(' '),
    email: emails.pop(),
    password: chance.word(),
    isAdmin: chance.weighted([true, false], [5, 95]),
    image: randPhoto(),
    location: chance.zip(),
    searchRadius: chance.integer({min:0,max:100}),
    weight: chance.integer({min:80,max:300}),
    birthday: chance.birthday({year: year}),
    minAge: chance.integer({min: 18, max: 30}),
    maxAge: chance.integer({min:31, max: 65})
  });
}

function generateUsers () {

    var year = chance.year({min:1952, max: 1997});


  var users = doTimes(numUsers, randUser);
  users.push(User.build({
    name: 'Zach',
    image: randPhoto(),
    email: 'z@z.com',
    password: '123',
    isAdmin: true,
    location: chance.zip(),
    searchRadius: chance.integer({min:0,max:100}),
    weight: chance.integer({min:80,max:300}),
    birthday: chance.birthday({year: year}),
    minAge: chance.integer({min: 18, max: 30}),
    maxAge: chance.integer({min:31, max: 65})
  }));

  users.push(User.build({
    name: 'Andrew',
    image: randPhoto(),
    email: 'a@a.com',
    password: '123',
    isAdmin: true,
    location: chance.zip(),
    searchRadius: chance.integer({min:0,max:100}),
    weight: chance.integer({min:80,max:300}),
    birthday: chance.birthday({year: year}),
    minAge: chance.integer({min: 18, max: 30}),
    maxAge: chance.integer({min:31, max: 65})
  }));

  return users;
}


function createUsers () {
  return Promise.map(generateUsers(), function (user) {
    return user.save();
  });
}



function seed () {
  return createUsers();
}

db.sync({force: true})
.then(function () {
  return seed();
})
.then(function(createdUsers){
  // var matches = []
  // for(var i = 0;i<100;i++){
  //   matches.push(createdUsers[chance.integer({min:1,max:99})].addInst(createdUsers[chance.integer({min:1,max:99})],{IR: chance.bool()}));
  // }

  // return Promise.all(matches);

})
.then(function () {
  console.log('Seeding successful');
}, function (err) {
  console.error('Error while seeding');
  console.error(err.stack);
})
.then(function () {
  process.exit();
});