const { Product } = require('../models')
const { Store } = require('../models')
const { Status } = require('../models')
module.exports = {
    async get_all(req, res) {
        try {
            const product = await Product.findAll()
            res.send(product)
        } catch (err) {
            res.status(500).send({
                error: 'Ошибка получения списка'
            })
        }
    },
    async get(req, res) {
        try {

        } catch (err) {

        }
    },

    async create_product(req, res) {
        try {
            const { name, plu, store, is_on_shelf, is_on_order } = req.body;
            //проверка на уникальность продукта
            console.log(name);
            product_db = await Product.findOne({
                where: {
                    name: name
                }
            })
            if (product_db === null) {
                console.log("Добавляем");
                //добавляем статус //создание баланса //получение id баланса
                const status_db = await Status.create({ is_on_shelf: is_on_shelf, is_on_order: is_on_order });
                //поиск магазина или создание  //получение id магазина
                const store_db = await Store.findOne({
                    where: {
                        name: store
                    }
                })
                if (store_db === null) {
                    console.log("Add Store");
                    store_db = await Store.create({ name: store })
                }
                console.log("id", store_db.id);
                //создание продукта
                try {
                    product_db = await Product.create({ plu: plu, name: req.body.name, StoreId: store_db.id, StatusId: status_db.id })
                    res.status(500).send({
                        error: 'Добавили'
                    })
                } catch (err) {
                    res.status(500).send({
                        error: err
                    })
                    console.log(err);
                }

            } else {
                res.status(500).send({
                    error: 'Не добавляем'
                })
                console.log("Не добавляем");
            }
        } catch (err) {
            res.status(500).send({
                error: 'Произошла ошибка при обновлении'
            })
        }
    }, async create_balance(req, res) {

    },
    async balance_Up(req, res) {
        try {

        } catch (err) {

        }
    },
    async balance_Down(req, res) {
        try {

        } catch (err) {

        }
    },
    async create_store(req, res) {
        try {
            const product = await Store.create(req.body)
            res.send(product)
        } catch (err) {
            res.status(500).send({
                error: 'Произошла ошибка при обновлении'
            })
        }
    },

}