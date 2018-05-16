// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('5aeddbd79624a60cb02402e7')
  },{
    $set:{
      completed: false
    }
  },{
    returnOriginial: true
  }).then(result =>{
    console.log(result)
  }).catch(err =>{
    console.log(err);
  });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5af08e233ec1aa51c8469b5f')
  },{
    $set:{
      name: 'samimmm'
    },
    $inc:{
      age: 1
    }
  },{
    returnOriginial: true
  }).then(result =>{
    console.log(result);
  }).catch(err =>{
    console.log(err);
  })
});