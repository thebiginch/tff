'use strict';

var Sequelize = require('sequelize');


module.exports = function(db) {
    db.define('matchMaking', {
        IR: {
            type: Sequelize.BOOLEAN
        },
        CR: {
            type: Sequelize.BOOLEAN
        },
    }, {
        classMethods: {
            findChallengers: function(userId) {
              var User = db.model('user');

              console.log(User)
                return this.findAll({
                    where: {
                        challId: userId,
                        IR: true
                    },
                })
            }
        }
    })
};
