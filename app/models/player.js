module.exports = function(sequelize, Sequelize) {

	var Player = sequelize.define('Player', {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		email: {
			type:Sequelize.TEXT,
			validate: {
				isEmail: true
			}
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
		team: {
			type:Sequelize.STRING,
			notEmpty: false
		},
		address: {
			type:Sequelize.TEXT,
			notEmpty: true
		},
		city: {
			type:Sequelize.TEXT,
			notEmpty: true
		},
		state: {
			type:Sequelize.TEXT,
			notEmpty: true
		},
		zipcode: {
			type:Sequelize.TEXT,
			notEmpty: true
		},
		position: {
			type:Sequelize.STRING,
			notEmpty: false
		},
		nickname: {
			type:Sequelize.STRING,
			notEmpty: false
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