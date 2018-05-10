module.exports = function(sequelize, Sequelize) {

	var Player = sequelize.define('Player', {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		routename: {
			type:Sequelize.STRING,
			notEmpty: true
		},
		firstname: {
			type:Sequelize.STRING,
			notEmpty: true
		},
		middlename: {
			type:Sequelize.STRING,
			notEmpty: false
		},
		lastname: {
			type:Sequelize.STRING,
			notEmpty: true
		},
		secondlastname: {
			type:Sequelize.STRING,
			notEmpty: false
		},
		dob: {
			type:Sequelize.DATEONLY,
			notEmpty: true
		},
		address: {
			type:Sequelize.TEXT,
			notEmpty: true
		},
		phonenumber: {
			type:Sequelize.STRING,
			notEmpty: true
		},
		emergencynumber: {
			type:Sequelize.STRING,
			notEmpty: true
		},
		profilepicture: {
			type:Sequelize.STRING,
			notEmpty: false
		},
		currentteam: {
			type:Sequelize.STRING,
			notEmpty: false
		},
		nickname: {
			type:Sequelize.TEXT,
			notEmpty: false
		},
		email: {
			type:Sequelize.TEXT,
			validate: {
				isEmail: true
			}
		},
		about: {
			type:Sequelize.TEXT,
			notEmpty: false
		},
		status: {
			type: Sequelize.ENUM('active', 'inactive'),
			defaultValue: 'active'
		}
	});

	return Player;
}