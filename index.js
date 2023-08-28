//DEPENDENCIES
const express = require('express')
const app = express()

const gameDataControllers = require('./controllers/gameData_controller')
const userDataController = require('./controllers/userData_controller')

require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/user',userDataController)
app.use('/game',gameDataControllers)


app.get('/', (req, res) => {
    res.status(200).json({
        message: 'This is MileStone Back End Part'
    })
})


app.listen(process.env.PORT, (req, res) => {
    console.log(`http://localhost:${process.env.PORT}`)
})