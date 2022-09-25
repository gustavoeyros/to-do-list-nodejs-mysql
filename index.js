const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')
const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static('public')) //css


//Inserindo as tarefas
app.post('/tasks/insert', (req, res)=>{
    const task = req.body.task
    const sql = `INSERT INTO tasks (task) VALUES ('${task}')`;
    pool.query(sql, function(err){
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })
})

app.get('/', (req,res)=>{
    //Visualizar as tarefas
    const sql = `SELECT*FROM tasks`
    pool.query(sql, function(err, data){
        if(err){
            console.log(err)
        }
        const task = data;
        res.render('home', {task})
    })
   
})







app.listen(3000, ()=>{
    console.log("Servidor rodando na porta 3000")
})