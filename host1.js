const storeController = require("./controllers/StoreController")

module.exports = (app) => {
        app.post('/get_balance', storeController.get_balance)
        app.post('/get_product', storeController.get_product)
        app.post('/add_product', storeController.add_product)
        app.post('/create_balance', storeController.create_balance)
        app.post('/balance_Up', storeController.balance_Up)
        app.post('/balance_Down', storeController.balance_Down)
        app.post('/add_store', storeController.add_store)
}