import should from 'should';
import { app, server } from '../../../server/app';
import request from 'supertest';


describe('GET /api/schedules', ()=> {

  afterEach( function(done){
    server.close();
    done();
  });

  it('should respond with JSON array', (done)=> {
    request(app)
      .get('/api/schedules')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.data.should.be.instanceof(Array);
        done();
      });
  });
});
