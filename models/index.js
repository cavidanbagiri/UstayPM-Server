'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
  // let connection_string = `postgres://${process.env.DB_PRODUCTION_USER}:${process.env.DB_PRODUCTION_PASSWORD}@${process.env.DB_PRODUCTION_HOST}/${process.env.DB_PRODUCTION_NAME}?sslmode=no-verify`;
  // let connection_string = `postgres://${process.env.DB_PRODUCTION_USER}:${process.env.DB_PRODUCTION_PASSWORD}@${process.env.DB_PRODUCTION_HOST}/${process.env.DB_PRODUCTION_NAME}?ssl=true`; 
  // sequelize = new Sequelize(connection_string);
  // sequelize = new Sequelize('ustay_pm', 'ustay_pm_user', 'w6YSQ33DBLKS9YPaIMj5PiDjKB13QDPi', {
  //   host: 'dpg-ck8u83vsasqs739c6oh0-a.frankfurt-postgres.render.com',
  //   dialect: 'postgres',
  //   dialectOptions: {
      
  //     // Your pg options here
  //     ssl: true
  //     //{
  //       // sslmode: 'prefer', 
  //       // require: true,
  //       // rejectUnauthorized: true,
  //       // ca: fs.readFileSync("C:\\Users\\Ramzes\\Downloads\\BaltimoreCyberTrustRoot.crt.pem")
  //     // }
  //   }
  // });
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
