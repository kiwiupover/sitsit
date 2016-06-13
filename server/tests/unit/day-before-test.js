import assert from 'assert';
import moment from 'moment';
import utils from '../utils';
import formatDate from '../../server/lib/day-before';


describe('day before schedules', () => {
  it('finds schedules for the b', () => {
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
