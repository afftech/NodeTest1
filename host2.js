
const StoreFilterAction = require("./controllers/StoreFilterController")

module.exports = (app) => {
   app.get('/get_journal', StoreFilterAction.get_journal)
}