const { ObjectID } = require('mongodb');
const { mongoose } = require('./../playground/server/db/mongoose');
const { Todo } = require('./server/models/Todo');
const { User } = require('./server/models/User');

const id = '5af726158fed16190c4886ad';
if(!ObjectID.isValid(id)){
  console.log('ID not valid');
}else{
  console.log('Data is valid')
}

Todo.find({
  _id: id
}).then(todo =>{
  console.log(todo);
});
Todo.findOne({
  _id: id
}).then(todo =>{
  console.log(todo);
});
Todo.findById(id).then(todo =>{
  if(!todo){
    return console.log("Id not found");
  }
  console.log(JSON.stringify(todo, undefined, 2));
}).catch(e =>{
  console.log(e);
})