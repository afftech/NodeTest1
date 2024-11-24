module.exports = (sequelize, DataTypes) => {
    const J_data = sequelize.define('J_data', {
        plu: DataTypes.BIGINT,
        data: DataTypes.BIGINT,
    })
    return J_data
}
