const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')
const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static('public')) //css

app.get('/', (req,res)=>{
    res.render('home')
})







app.listen(3000, ()=>{
    console.log("Servidor rodando na porta 3000")
})