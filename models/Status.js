module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define('Status', {
        is_on_shelf: DataTypes.BIGINT,
        is_on_order: DataTypes.BIGINT,
    })
    return Status
}