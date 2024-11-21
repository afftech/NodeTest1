module.exports = (sequelize, DataTypes) => {
    const Store = sequelize.define('Store', {
        name: DataTypes.STRING,
    })
    return Store
}