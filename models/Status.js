module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define('Status', {
        is_on_shelf: DataTypes.BIGINT,//на полке
        is_on_order: DataTypes.BIGINT,//на заказе
    })
    return Status
}
/*module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define('Status', {
        is_on_shelf: DataTypes.BIGINT,//на полке
        is_on_order: DataTypes.BIGINT,//на заказе
    })
    return Status
}*/