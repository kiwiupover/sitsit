import should from 'should';
import utils from '../../utils';
import Sitter from '../../../server/api/sitter/sitter.model.js';

describe('Sitter: model', function () {

  describe('#create()', function () {
    it('should create a new Sitter', function (done) {
      // Create a User object to pass to User.create()
      let sitter = {
        firstName: 'Drea',
        phone: '206 444 555',
        parentPrimaryPhone: '206 777 7777',
        parentSecondayPhone: '206 888 8888'
      };
      
      Sitter.create(sitter,(err, createdSitter) => {
        should.not.exist(err);

        createdSitter.firstName.should.equal(sitter.firstName);
        createdSitter.phone.should.equal(sitter.phone);
        createdSitter.parentPrimaryPhone.should.equal(sitter.parentPrimaryPhone);
        createdSitter.parentSecondayPhone.should.equal(sitter.parentSecondayPhone);
        done();
      });
    });
  });

});
