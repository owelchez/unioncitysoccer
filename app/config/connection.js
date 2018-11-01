var Sequelize = require('sequelize');

var path = require("path");
var operatorsAliases = require('../config/alias.js');
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config', 'config.js'))[env];
var connection = new Sequelize(
				config.database, 
				config.username, 
				config.password, {
					host: process.env.JAWSDB_HOST,
					dialect: process.env.DIALECT,
					operatorsAliases: operatorsAliases
});

module.exports = connection;