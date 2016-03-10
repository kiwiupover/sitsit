import mongoose from 'mongoose';

// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing

beforeEach(function(done){

  function clearDB() {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(function() {});
    }
    return done();
  }

  if (mongoose.connection.readyState === 0) {
    mongoose.connect('mongodb://localhost/sitsit-test', function (err) {
      if (err) {
        throw err;
      }
      return clearDB();
    });
  } else {
    return clearDB();
  }
});

afterEach((done) => {
  mongoose.disconnect();
  return done();
});
