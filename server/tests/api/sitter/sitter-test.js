import should from 'should';
import app from '../../../server/app';
import request from 'supertest';

describe('GET /api/sitter', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/sitters')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.data.should.be.instanceof(Array);
        done();
      });
  });
});
