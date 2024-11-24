module.exports = (sequelize, DataTypes) => {
    const Journal = sequelize.define('Journal', {
        StoreId: DataTypes.BIGINT,
        action: DataTypes.STRING,
    })
    return Journal
}
