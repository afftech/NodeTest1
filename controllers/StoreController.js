const { Product } = require('../models')
const { Store } = require('../models')
const { Status } = require('../models')
const { Journal } = require('../models')
const { J_data } = require('../models')
const { Op, where } = require('sequelize');

module.exports = {
    async get_balance(req, res) {//получаем остатки по фильтррам
        try {
            let arr1 = [];
            let arr2 = [];
            let on_shelf = [];
            let on_order = [];
            const { StoreId, plu, from_s, to_s, from_o, to_o } = req.body
            journal_db_s = await Journal.findAll({//ищем в журнале действия связанные с опр магазином
                where: {
                    StoreId: StoreId,
                    updatedAt: {
                        [Op.between]: [from_s, to_s]
                    },
                    [Op.or]: [
                        { action: "Create balance-shelf" },
                        { action: "up balance-shelf" },
                        { action: "down balance-shelf" },]
                }
            })
            for (var i = 0; i < journal_db_s.length; i++) {
                let obj = { JournalId: journal_db_s[i].id };
                arr1.unshift(obj);
            }
            j_data_db_s = await J_data.findAll({
                where: {
                    [Op.or]: arr1,
                    plu: plu
                }
            })
            journal_db_o = await Journal.findAll({
                where: {
                    StoreId: StoreId,
                    updatedAt: {
                        [Op.between]: [from_o, to_o]
                    },
                    [Op.or]: [
                        { action: "Create balance-order" },
                        { action: "up balance-order" },
                        { action: "down balance-order" }],
                }
            })
            for (var i = 0; i < journal_db_o.length; i++) {
                let obj = { JournalId: journal_db_o[i].id };
                arr2.unshift(obj);
            }
            j_data_db_o = await J_data.findAll({
                where: {
                    [Op.or]: arr2,
                    plu: plu
                }
            })
            for (var i = 0; i < j_data_db_s.length; i++) {
                let obj = {
                    plu: plu,
                    where: journal_db_s[i].action,
                    balanse: j_data_db_s[i].data,
                    StoreId: journal_db_s[i].StoreId
                };
                on_shelf.unshift(obj);
            }

            for (var i = 0; i < j_data_db_o.length; i++) {
                let obj = {
                    plu: plu,
                    where: journal_db_o[i].action,
                    balanse: j_data_db_o[i].data,
                    StoreId: journal_db_o[i].StoreId
                };
                on_order.unshift(obj);
            }
            res.send({ on_shelf, on_order })
        } catch (err) {
            res.status(500).send({
                error: 'Ошибка получения списка'
            })
            console.log(err)
        }
    },
    async get_product(req, res) {
        try {
            const { name, plu } = req.body;
            product_db = await Product.findOne({
                where: {
                    name: name,
                    plu: plu
                }
            })
            res.send(product_db);
        } catch (err) {
            res.status(500).send({
                error: 'Произошла ошибка при обновлении'
            })
        }
    },

    async add_product(req, res) {
        try {
            const { name, plu, store } = req.body;
            //проверка на уникальность продукта
            store_db = await Store.findOne({
                where: {
                    name: store
                }
            })
            //поиск магазина или создание  //получение id магазина
            if (store_db === null) {//если нет магазиеа
                console.log("Add Store");
                store_db = await Store.create({ name: store })
                journal_db = await Journal.create({
                    StoreId: store_db.id,
                    action: "Add store",
                });
            }
            product_db = await Product.findOne({
                where: {
                    StoreId: store_db.id,
                    name: name
                }
            })
            if (product_db === null) {
                //добавляем статус //создание баланса //получение id баланса
                status_db = await Status.create({ is_on_shelf: 0, is_on_order: 0 });
                journal_db = await Journal.create({
                    StoreId: store_db.id,
                    action: "Create balance-shelf",
                });
                J_data_db = await J_data.create({
                    plu: plu,
                    data: 0,
                    JournalId: journal_db.id
                });
                journal_db = await Journal.create({
                    StoreId: store_db.id,
                    action: "Create balance-order",
                });
                J_data_db = await J_data.create({
                    plu: plu,
                    data: 0,
                    JournalId: journal_db.id
                });
                //создание продукта
                product_db = await Product.create({ plu: plu, name: req.body.name, StoreId: store_db.id, StatusId: status_db.id })

                res.send({
                    message: 'Добавили'
                })
                journal_db = await Journal.create({
                    StoreId: store_db.id,
                    action: "Add product",
                });
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
        try {
            const { name, is_on_shelf, is_on_order } = req.body;
            //const status_db = await Status.create({ is_on_shelf: /*is_on_shelf*/0, is_on_order: /* is_on_order*/0 });
            const product_db = await Product.findOne({
                where: {
                    name: name
                }
            })
            if (product_db.name === name) {
                const status_db = await Status.update({
                    is_on_shelf: is_on_shelf,
                    is_on_order: is_on_order
                }, {
                    where: {
                        id: product_db.StatusId
                    }
                })
                journal_db = await Journal.create({
                    StoreId: product_db.StoreId,
                    action: "Create balance-shelf",
                });
                J_data_db = await J_data.create({
                    plu: product_db.plu,
                    data: is_on_shelf,
                    JournalId: journal_db.id
                });
                journal_db = await Journal.create({
                    StoreId: product_db.StoreId,
                    action: "Create balance-order",
                });
                J_data_db = await J_data.create({
                    plu: product_db.plu,
                    data: is_on_shelf,
                    JournalId: journal_db.id
                });
                res.send({
                    message: 'Добавили остатки'
                })
                journal_db = await Journal.create({
                    StoreId: store_db.id,
                    action: "Add balance",
                });
            }
        } catch (err) {
            res.status(500).send({
                error: 'Произошла ошибка при обновлении'
            })
        }
    },
    async balance_Up(req, res) {
        try {
            let is_on_shelf_up
            let is_on_order_up
            const { name, where } = req.body;
            product_db = await Product.findOne({
                where: {
                    name: name
                }
            })
            status_db = await Status.findOne({
                where: {
                    id: product_db.StatusId
                }
            })
            is_on_shelf_up = status_db.is_on_shelf + 1
            is_on_order_up = status_db.is_on_order + 1

            //console.log("is_on_order_up");
            if (product_db.name === name) {
                if (where === 'is_on_shelf') {
                    status_db = await Status.update({
                        is_on_shelf: is_on_shelf_up
                    }, {
                        where: {
                            id: product_db.StatusId
                        }
                    })
                    journal_db = await Journal.create({
                        StoreId: product_db.StoreId,
                        action: "up balance-shelf",
                    });
                    J_data_db = await J_data.create({
                        plu: product_db.plu,
                        data: is_on_shelf_up,
                        JournalId: journal_db.id
                    });
                } else if (where === 'is_on_order') {
                    const status_db = await Status.update({
                        is_on_order: is_on_order_up
                    }, {
                        where: {
                            id: product_db.StatusId
                        }
                    })
                    journal_db = await Journal.create({
                        StoreId: product_db.StoreId,
                        action: "up balance-order",
                    });
                    J_data_db = await J_data.create({
                        plu: product_db.plu,
                        data: is_on_order_up,
                        JournalId: journal_db.id
                    });
                }
            }
            res.status(500).send({
                message: 'Up'
            })
            console.log("Up");
        } catch (err) {
            res.status(500).send({
                error: 'Произошла ошибка при обновлении'
            })
        }
    },
    async balance_Down(req, res) {
        try {
            let is_on_shelf_up
            let is_on_order_up
            const { name, where } = req.body;
            product_db = await Product.findOne({
                where: {
                    name: name
                }
            })
            status_db = await Status.findOne({
                where: {
                    id: product_db.StatusId
                }
            })
            is_on_shelf_down = status_db.is_on_shelf - 1
            is_on_order_down = status_db.is_on_order - 1

            if (product_db.name === name) {
                if (where === 'is_on_shelf') {
                    status_db = await Status.update({
                        is_on_shelf: is_on_shelf_down
                    }, {
                        where: {
                            id: product_db.StatusId
                        }
                    })
                    journal_db = await Journal.create({
                        StoreId: product_db.StoreId,
                        action: "down balance-shelf",
                    });
                    J_data_db = await J_data.create({
                        plu: product_db.plu,
                        data: is_on_shelf_down,
                        JournalId: journal_db.id
                    });
                } else if (where === 'is_on_order') {
                    const status_db = await Status.update({
                        is_on_order: is_on_order_down
                    }, {
                        where: {
                            id: product_db.StatusId
                        }
                    })
                    journal_db = await Journal.create({
                        StoreId: product_db.StoreId,
                        action: "down balance-order",
                    });
                    J_data_db = await J_data.create({
                        plu: product_db.plu,
                        data: is_on_order_down,
                        JournalId: journal_db.id
                    });
                }
            }
            res.status(500).send({
                message: 'Down'
            })
            console.log("Down");
        } catch (err) {
            res.status(500).send({
                error: 'Произошла ошибка при обновлении'
            })
        }
    },

    async add_store(req, res) {
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