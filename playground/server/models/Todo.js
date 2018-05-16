const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({

  text:{
    type: String,
    required: true
  },
  completed:{
    type: Boolean,
  },
  completedAt:{
    type:Number
  }
});
const Todo = mongoose.model('Todo', TodoSchema)
module.exports= {Todo };