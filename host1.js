const storeController = require("./controllers/StoreController")

module.exports = (app) => {
        app.get('/get_balance', storeController.get_balance)
        app.get('/get_product', storeController.get_product)
        app.post('/add_product', storeController.add_product)
        app.put('/create_balance', storeController.create_balance)
        app.post('/balance_Up', storeController.balance_Up)
        app.post('/balance_Down', storeController.balance_Down)
        app.put('/add_store', storeController.add_store)
}