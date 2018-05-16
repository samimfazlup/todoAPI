const { Todo } = require("./server/models/Todo");
const { User } = require("./server/models/User");
const { ObjectID } = require('mongodb');
const { mongoose } = require('./server/db/mongoose');


const id = '5afb0e51f3140816985372b6';
if(!ObjectID.isValid(id)){
  console.log('Id is not valid');

}
Todo.find({
  _id: id
}).then(todo =>{
  console.log('Todos', todo);
});
Todo.findOne({
  _id: id
}).then(todo =>{
  console.log('Todos', todo);
});
Todo.findById(id).then(todo =>{
  if(!todo){
    return console.log('Todo Not Found')
  }
  console.log('Todos', todo);
}).catch(e=>{
  console.log(e)
});