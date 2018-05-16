const { MongoClient, ObjectID}  = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    console.log('connection not established', err);
  }

  //console.log('Database is connected');
  db.collection('Users').findOneAndDelete({
    name: 'samim'
  }).then(result =>{
    console.log(result);
  }).catch(err=>{
    console.log(err);
  })
  db.close();
})