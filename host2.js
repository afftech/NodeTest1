
const StoreFilterAction = require("./controllers/StoreFilterController")

module.exports = (app) => {
   app.post('/get_journal', StoreFilterAction.get_journal)
}