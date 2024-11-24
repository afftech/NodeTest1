const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')
const { sequelize } = require('./models/')



const app = express()
const app1 = express()

app.use(morgan('combine'))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(__dirname + '/public/uploads'))
require('./host1')(app)
app.listen(process.env.PORT || config.port_host1)

app1.use(morgan('combine'))
app1.use(bodyParser.json())
app1.use(cors())
require('./host2')(app1)
app1.listen(process.env.PORT || config.port_host2)

sequelize.sync(/*{ force: true } /*для очищения БД при каждом запуске!*/)
    .then(() => {
        app.listen(config.port)
        console.log(`Server started! ${config.port_host1}`)
    })

sequelize.sync(/*{ force: true } /*для очищения БД при каждом запуске!*/)
    .then(() => {
        app1.listen(config.port)
        console.log(`Server started! ${config.port_host2}`)
    })