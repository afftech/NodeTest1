
const StoreFilterAction = require("./controllers/StoreFilterController")

module.exports = (app) => {
   app.post('/filter', StoreFilterAction.filter)
}