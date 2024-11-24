const { Journal } = require('../models')
const { Op } = require('sequelize');
module.exports = {
    async filter(req, res) {
        try {
            const { store_id, plu, from, to, action } = await Store.create(req.body)
            journal = Journal.findAll({
                [Op.between]: [{ store_id: from, store_id: to }],
            })
            console.log(journal);
            res.send()
        } catch (err) {
            res.status(500).send({
                error: 'Произошла ошибка при обновлении'
            })
        }
    },
}