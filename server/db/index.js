'use strict';
var db = require('./_db');

require('./models/matchMaking')(db);
require('./models/user')(db);
var User = db.model('user');

User.belongsToMany(User, {as: 'inst', through: 'matchMaking', foreignKey: "instId"});
User.belongsToMany(User, {as: 'chall', through: 'matchMaking', foreignKey: "challId"});

module.exports = db;
