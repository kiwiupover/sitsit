import should from 'should';
import { app, server } from '../../../server/app';
import request from 'supertest';

describe('API Client', function() {

  afterEach( function(done){
    server.close();
    done();
  });

  it('GET "/api/clients" should respond with JSON array', (done)=> {
    request(app)
      .get('/api/clients')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.data.should.be.instanceof(Array);
        done();
      });
  });
});
