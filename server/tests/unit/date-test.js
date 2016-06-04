import assert from 'assert';
import moment from 'moment';
import utils from '../utils';
import formatDate from '../../server/lib/format-date';


describe('format date', () => {
  it('returns the a date formatted for day month year 02/01/2016', () => {
    let now = new Date();
    let date = formatDate(now);
    assert.equal(date, moment(now).format('L'));
  });

  it('returns the a date formatted hours and minutes', () => {
    let now = new Date();
    let date = formatDate(now, 'LT');
    assert.equal(date, moment(now).format('LT'));
  });
});
