'use strict';

var Sequelize = require('sequelize');

module.exports = function (db) {
  db.define('matchMaking', {
  		IR : {
            type: Sequelize.BOOLEAN
        },
        CR : {
            type: Sequelize.BOOLEAN
        },
  },{

  	classMethods : {
  		findChallengers: function(){
  			return this.findAll({where: {IR: true}})
  		}
  	}
  });
};