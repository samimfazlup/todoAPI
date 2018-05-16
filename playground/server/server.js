const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require('mongodb');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/Todo');
const {User} = require('./models/User');
const app = express();
app.use(bodyParser.json());
app.post('/todos', (req, res)=>{
  const todo = new Todo({
    text: req.body.text
  });
  todo.save().then(todo =>{
    res.send(todo)
  })
  .catch(err =>{
    res.status(400).send(err);
  })
});
//Getting All todo
app.get('/todos', (req, res)=>{
  Todo.find().then(todos =>{
    res.send({todos})
  }).catch(e =>{
    res.status(400).send(e);
  })
});
//Getting a single todo
app.get('/todos/:id', (req, res)=>{
  const id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findById(id).then(todo =>{
      if (!todo) {
        return res.status(404).send();
      }
    res.send({todo});
  }).catch(e =>{
    console.log(e);
  });
});


app.listen(3000, () =>{
  console.log(" server started on port 3000");
});
module.exports = {app};