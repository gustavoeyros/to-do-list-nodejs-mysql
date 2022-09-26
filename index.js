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

//Resgatando dados para editar
app.get('/tasks/edit/:id', (req, res)=>{
    const id = req.params.id
    const sql = `SELECT*FROM tasks WHERE id = ${id}`
    pool.query(sql, function(err, data){
        if(err){
            console.log(err)
        }
        const tasks = data[0]
        res.render('edit', {tasks})
    })
})

//Alterar os dados
app.post('/tasks/updatetask', (req, res)=>{
    const id = req.body.id
    const task = req.body.task
    const sql = `UPDATE tasks SET task = '${task}' WHERE id = ${id}`
    pool.query(sql, function(err, data){
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })
})

//Apagar os dados
app.get('/tasks/remove/:id', (req, res)=>{
    const id = req.params.id
    const sql = `DELETE FROM tasks where id= ${id}`
    pool.query(sql, function(err){
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })
})






app.listen(3000, ()=>{
    console.log("Servidor rodando na porta 3000")
})