var env = require('dotenv').config();
var Sequelize = require('sequelize');

var path = require("path");
var operatorsAliases = require('../config/alias.js');
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var connection = new Sequelize(
				process.env.JAWSDB_DATABASE,
				process.env.JAWSDB_USERNAME,
				process.env.JAWSDB_PASSWORD, {
					host: process.env.JAWSDB_HOST,
					dialect: process.env.DIALECT,
					operatorsAliases: operatorsAliases
});

module.exports = connection;