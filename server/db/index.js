'use strict';
var db = require('./_db');

require('./models/user')(db);
require('./models/matchMaking')(db);

var matchMaking = db.model('matchMaking');
var User = db.model('user');

User.belongsToMany(User, {as: 'inst', through: 'matchMaking', foreignKey: "instId"});
User.belongsToMany(User, {as: 'chall', through: 'matchMaking', foreignKey: "challId"});


//matchMaking.hasMany(User, {as: 'instId'});
//matchMaking.belongsTo(User, {as: 'chall'});



module.exports = db;
