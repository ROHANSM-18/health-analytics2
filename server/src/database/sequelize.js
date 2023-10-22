const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('medicaldb', 'root', 'u$55O8S[@XsP', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.sync().then(() => {
  console.log('Database synchronized.');
}).catch((error) => {
  console.error('Database synchronization error:', error);
});

module.exports = sequelize;