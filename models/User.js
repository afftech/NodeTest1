// Если меняется модель базы, то в политики обязательно надо добавть аналогичную запись!!!
//const Promise = require('bluebird');
const bcrypt = /*Promise.promisifyAll(*/require('bcrypt');
const { date } = require('joi');

function hashPassword (user, options) {
  const saltRounds = 8;
  const pas = user.password;
  /*if (!user) {
    console.log("Все плохо, мы здесь((")
    return
  }*/
  console.log("Почти победа)))")
//const salt = bcrypt.genSaltSync(SALT_FACTOR);
const hash = bcrypt.hashSync(pass, saltRounds);
user.setDataValue('password', hash)
  return user
}
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    surname:DataTypes.STRING,
    patronymic:DataTypes.STRING,
    phoneNumber:DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password:DataTypes.STRING,
    avatar:DataTypes.STRING,
  }/*, {  // для подтягивакия крипто ф-ии хеширования пароля
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
      beforeSave: hashPassword
    }
  }*/
  )
User.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password)
  }
  return User
}