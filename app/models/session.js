module.exports = (sequelize, DataTypes) => {
  return sequelize.define('ConnectSession', {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    expires: DataTypes.DATE
  });
};