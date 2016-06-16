var path = require('path');
var Sequelize = require('sequelize');



var dbURI = 'postgres://localhost:5432/tff';
// var env = require(path.join(__dirname, '../env'));


// var db = new Sequelize(env.DATABASE_URI);
var db = new Sequelize(dbURI)


module.exports = db;
