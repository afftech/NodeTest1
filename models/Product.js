
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        plu: DataTypes.STRING,
        name: DataTypes.STRING,
    })
    return Product
}
