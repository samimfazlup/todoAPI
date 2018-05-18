const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({

  text:{
    type: String,
    required: true
  },
  completed:{
    type: Boolean,
    default: false
  },
  completedAt:{
    type:Number,
    default: null
  }
});
const Todo = mongoose.model('Todo', TodoSchema)
module.exports= {Todo };