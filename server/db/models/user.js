'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function(db) {

    //var matchMaking = db.model('matchMaking');

    db.define('user', {
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        salt: {
            type: Sequelize.STRING
        },
        facebook_id: {
            type: Sequelize.STRING
        },
        isAdmin: {
            type: Sequelize.BOOLEAN
        },
        image: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING,
            validate: {
                len: 5,
            }
        },
        searchRadius: {
            type: Sequelize.INTEGER,
            validate: {
                max: 100,
                min: 0
            }
        },
        weight: {
            type: Sequelize.INTEGER,
            validate: {
                min: 80,
                max: 300
            }
        },
        birthday: {
            type: Sequelize.DATE,

        },
        minAge: {
            type: Sequelize.INTEGER,
            validate: {
                min: 18,
            }
        },
        maxAge: {
            type: Sequelize.INTEGER,
            validate: {
                max: 65,
            }
        },
    }, {
        getterMethods: {
            age: function() {
                var ageDifMs = Date.now() - this.birthday;
                var ageDate = new Date(ageDifMs);
                return Math.abs(ageDate.getUTCFullYear() - 1970);
                },
        },
        instanceMethods: {
            sanitize: function() {
                return _.omit(this.toJSON(), ['password', 'salt']);
            },
            correctPassword: function(candidatePassword) {
                return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
            }
        },
        classMethods: {
            generateSalt: function() {
                return crypto.randomBytes(16).toString('base64');
            },
            encryptPassword: function(plainText, salt) {
                var hash = crypto.createHash('sha1');
                hash.update(plainText);
                hash.update(salt);
                return hash.digest('hex');
            },
        },
        hooks: {
            beforeValidate: function(user) {
                if (user.changed('password')) {
                    user.salt = user.Model.generateSalt();
                    user.password = user.Model.encryptPassword(user.password, user.salt);
                }
            }
        },
    });
};
