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
                findMatches: function(userId) {
                    return this.findAll({
                        where: {
                            IR: true,
                            CR: true,
                            $and: {
                                $or: [{ instId: userId }, { challId: userId }]
                            }
                        }
                    })
                },
                findBouts: function(userId) {
                    return this.findAll({
                        where: {
                            IR: true,
                            CR: null,
                            challId: userId 
                        }
                    })
                },
            },
        })
}
