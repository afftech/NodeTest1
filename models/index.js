const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)
fs
  .readdirSync(__dirname)
  .filter((file) =>
    file !== 'index.js'
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)//здесь добавляем все модели
    db[model.name] = model
  })

db.Store.hasOne(db.Product, {
  foreignKey: {
    allowNull: false,
  }
});
db.Product.belongsTo(db.Store);

db.Status.hasOne(db.Product, {
  foreignKey: {
    allowNull: false,
  }
});

db.Product.belongsTo(db.Status);

db.Journal.hasOne(db.J_data, {
  foreignKey: {
    allowNull: false,
  }
});
db.J_data.belongsTo(db.Journal);

db.sequelize = sequelize
db.Sequelize = Sequelize
module.exports = db