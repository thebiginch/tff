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
            findInstigators: function(to) {

                return this.findAll({
                    where: {
                        challId: to,
                    },
                })
                // .then(function(inst){

                //     var users = [];
                //     inst.forEach(id => {
                //         users.push(User.findById(id))
                //     })
    

                //   return Promise.all(users);
                // })
                // .then(users => {
                //     return users;
                // });

            }
        },
       // defaultScope: {include: [{model: User, as: 'inst'}]}
    })
};
