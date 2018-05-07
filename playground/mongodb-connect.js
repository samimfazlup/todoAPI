const {MongoClient, ObjectID} = require("mongodb");
MongoClient.connect("mongodb://localhost:27017/TodoApp",(err, db)=>{
  if(err){
    return console.log(`There are some ptoblem connection Database ${err}`);
  }
  // db.collection('Todos').insertOne({
  //   _Id: new ObjectID(),
  //   text: 'Something to do',
  //   completed: true
  // },(err, result)=>{
  //   if(err){
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });
  // db.collection('Todos').find().pretty().then(docs =>{
  //   console.log(docs);
  // },(err)=>{
  //   console.log(err);
  // })
  //console.log(db.collection('Todos').find().pretty());
  //db.close();
  //console.log("connected");
  // db.collection("Users").insertOne({
  //   name: 'samim',
  //   age: 24,
  //   profession: 'web developer'
  // }).then(doc=>{
  //   console.log(JSON.stringify(doc.ops, undefined, 2));
  // }).catch(err =>{
  //   console.log(err);
  // })
  db.collection("Users").findOne({
    name: 'samim'
  }).then(user =>{
    console.log(user)
  }).catch(err =>{
    console.log(err);
  })
})