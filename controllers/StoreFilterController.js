const { Journal, J_data, } = require('../models')
const { Op } = require('sequelize');
module.exports = {
    async get_journal(req, res) {//получаем остатки по фильтррам
        try {
            let arr = [];
            let arr2 = [];
            const { StoreId, plu, from, to, action } = req.body
            journal_db = await Journal.findAll({
                where: {
                    StoreId: StoreId,
                    action: action,
                    updatedAt: {
                        [Op.between]: [from, to]
                    },

                }
            })
            console.log(journal_db);//получаем id  записи магазина
            if (action == "Add store") {
                res.send(journal_db)
            } else {


                try {
                    for (var i = 0; i < journal_db.length; i++) {
                        let obj = { JournalId: journal_db[i].id };
                        arr.unshift(obj);
                    }
                    console.log(arr)
                } catch (err) {
                    console.log(err)
                }

                j_data_db = await J_data.findAll({
                    where: {
                        [Op.or]: arr,
                        plu: plu
                    }
                })
                for (var i = 0; i < j_data_db.length; i++) {
                    let obj = {
                        plu: plu,
                        where: journal_db[i].action,
                        data: j_data_db[i].data,
                    };
                    arr2.unshift(obj);
                }
                res.send(arr2)
            }
        } catch (err) {
            res.status(500).send({
                error: 'Ошибка получения списка'
            })
            console.log(err)
        }
    },
}