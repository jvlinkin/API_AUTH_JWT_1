require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

//Json as response:
app.use(express.json())
//Connection DataBase:
const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASSWORD

mongoose.connect(`mongodb+srv://${db_user}:${db_pass}@cluster0.zdhzmqt.mongodb.net/?retryWrites=true&w=majority`).then(
    console.log('Conectado no BD.')
).catch((error) =>{
    console.log('Ocorreu um erro ao se conectar com o MongoDB:',error)
})

//Models
const User = require('./models/CreateUser')


app.get('/', (req,res) =>{
    res.status(200).json({msg: 'Working! Welcome to our API! :)'})
})

//create user
const createUserRoute = require('./routes/createUser')
app.use('/createuser', createUserRoute)




//login
const loginRoute = require('./routes/login')
app.use('/login', loginRoute)

//shows users - ROTA AUTENTICADA
const showUsers = require('./routes/showUsers')
app.use('/showusers', showUsers)

app.listen(8081, () =>{
    console.log('Listening on 8081.')
})