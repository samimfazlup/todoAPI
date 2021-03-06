const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/Todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
  
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 123
}]; 
beforeEach(done => {
  Todo.remove({}).then(()=>{
   new Promise((resolve, reject)=>{
     resolve(Todo.insertMany(todos));
   });
  }).then(()=> done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    const text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', ()=>{
  it('Should return a todo doc',(done)=>{
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res =>{
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
      });
      it('sohould return 404 if todo not found', done =>{
        const hexId = new ObjectID().toHexString();
        request(app)
          .get(`/todos/${hexId}`)
          .expect(404)
          .end(done);
      });
  it('should return 404 for non object id',(done)=>{
    request(app)
      .get(`/todos/123abc`)
      .expect(404)
      .end(done);
  });

  });

  describe('DELETE /todos/:id',()=>{
    it('should remove a todo',(done)=>{
      const hexId = todos[1]._id.toHexString();
      request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect(res =>{
          expect(res.body.todo._id).toBe(hexId);
        })
        .end((err, res)=>{
          if(err){
            return done(err);
          }
          Todo.findById(hexId).then(todo =>{
            expect(todo).toBeFalsy();
            done();
          }).catch(err =>{
            done(err);
          });
        });
    });
    it('should return 404 if todo not Found', (done)=>{
      const hexId = new ObjectID().toHexString(); 
      request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });
    it('should return 404 if object id is valid', (done)=>{
      request(app)
        .delete(`/todos/123abc`)
        .expect(404)
        .end(done);
    });
  });

  describe('PATCH todos/:id', (req, res)=>{
    it('should updated the todo', done =>{
      const hexId = todos[0]._id.toHexString();
      const text = "This should be the new text";
      request(app)
      .patch(`/todos/${hexId}`)
        .send({
          completed: true,
          text
        })
        .expect(200)
        .expect(res =>{
          expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(typeof res.body.todo.completedAt).toBe('number');
        })
        .end(done);
    });
    it('should clear completedAt when todo is not completed', (done)=>{
      const hexId = todos[1]._id.toHexString(); 
      const text  = "This should be new text";
      request(app)
        .patch(`/todos/${hexId}`)
        .send({
          text,
           completed: false
        })
        .expect(200)
        .expect(res =>{
          expect(res.body.todo.text).toBe(text);
          expect(res.body.todo.completed).toBe(false);
          expect(res.body.completedAt).toBeFalsy();
        })
        .end(done);
    })
  });