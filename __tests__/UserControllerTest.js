const request = require('supertest');
const assert = require('assert');
const app = require('../server');

describe('USERS Controller', function() {
  let token = 'Bearer ';

  describe('POST /users/authenticate', function() {
    it('Successfully returns JWT Token', function(done) {
      request(app)
        .post('/users/authenticate')
        .send({username: 'test', password: 'test'})
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, response) {
          if (err) return done(err);

          assert.ok(response.body.token);
          token += response.body.token;

          done();
        })
    });
  });

  describe('GET /users', function() {
    it('Fails due to unauthorized error', function(done) {
      request(app)
        .get('/users')
        .set('Accept', 'application/json')
        .expect(401)
        .end(function (err, response) {
          if (err) return done(err);

          assert.deepEqual(response.body, {
            message: 'Invalid Token'
          });

          done();
        })
    });

    it('Successfully returns a list of users', function(done) {
      request(app)
        .get('/users')
        .set('Authorization', token)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, response) {
          if (err) return done(err);

          assert.equal(response.body.data.length, 50);

          done();
        })
    });

    it('Successfully returns a single user', function(done) {
      request(app)
        .get('/users/1')
        .set('Authorization', token)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, response) {
          if (err) return done(err);

          assert.equal(response.body.data.id, 1);

          done();
        })
    });
  });

  describe('POST /users', function() {
      it('Fails due to unauthorized error', function(done) {
      request(app)
        .post('/users')
        .set('Accept', 'application/json')
        .expect(401)
        .end(function (err, response) {
          if (err) return done(err);

          assert.deepEqual(response.body, {
            message: 'Invalid Token'
          });

          done();
        })
    });

    it('Successfully creates a user', function(done) {
      request(app)
        .post('/users')
        .send({username: 'test', password: 'test', firstName: 'test', lastName: 'test'})
        .set('Authorization', token)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, response) {
          if (err) return done(err);

          assert.ok(response.body.data.id);
          assert.equal(response.body.data.username, 'test');

          done();
        })
    });
  });

  describe('PUT /users', function() {
      it('Fails due to unauthorized error', function(done) {
      request(app)
        .put('/users')
        .set('Accept', 'application/json')
        .expect(401)
        .end(function (err, response) {
          if (err) return done(err);

          assert.deepEqual(response.body, {
            message: 'Invalid Token'
          });

          done();
        })
    });

    it('Successfully updates a user', function(done) {
      request(app)
        .put('/users/1')
        .send({
            username: 'updatedTest',
            firstName: 'updatedTest',
            lastName: 'updatedTest'
          })
        .set('Authorization', token)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, response) {
          if (err) return done(err);

          assert.deepEqual(response.body.data, {
            id: 1,
            username: 'updatedTest',
            firstName: 'updatedTest',
            lastName: 'updatedTest'
          });

          done();
        })
    });
  });

  describe('DELETE /users', function() {
    it('Fails due to unauthorized error', function(done) {
      request(app)
        .delete('/users/1')
        .set('Accept', 'application/json')
        .expect(401)
        .end(function (err, response) {
          if (err) return done(err);

          assert.deepEqual(response.body, {
            message: 'Invalid Token'
          });

          done();
        })
    });

    it('Successfully updates a user', function(done) {
      request(app)
        .delete('/users/1')
        .set('Authorization', token)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err) {
          if (err) return done(err);
          done();
        })
    });
  });
});
