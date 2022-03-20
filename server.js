const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path =require('path')

const app = express();


require('dotenv').config()
app.use(express.json());
app.use(cors());


mongoose.connect(`mongodb+srv://akhiltodo:${process.env.ATLAS}@data.pgzbz.mongodb.net/todolists?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("connected to db"))
    .catch(console.error)

const Todo = require('./model/Todo')

app.get('/todo', async (req, res) => {

    const todo = await Todo.find();

    res.json(todo)


});
app.post('/todo/new', (req, res) => {
    const todo = new Todo({
        // text: "BUY NEW ISLAND"
        text: req.body.text
    });
    todo.save();
    res.json(todo)
});
app.delete('/todo/delete/:id', async (req, res) => {

    const result = await Todo.findByIdAndDelete(req.params.id)

    res.json(result);
});

app.get('/todo/complete/:id',async(req,res)=>{

    const todo =await Todo.findById(req.params.id);
    
    todo.completed=!todo.completed;
 
    todo.save();

    res.json(todo)
});


 //server production

 app.use(express.static(path.join("build")))
 app.get("*",(req,res)=>res.sendFile(path.resolve(__dirname,'client','build','index.html')));


app.listen(5000, () => console.log("server started at 5000"));