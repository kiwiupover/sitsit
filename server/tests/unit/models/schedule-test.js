import should from 'should';
import utils from '../../utils';
import moment from 'moment';
import mongoose from 'mongoose';
import merge from 'lodash/merge';

import Schedule from '../../../server/api/schedule/schedule.model.js';

describe('Schedule: model', function () {
  let schedule = {
    startDate: new Date("2016-06-09T16:30:00-0700"),
    endDate: new Date("2016-06-09T17:30:00-0700"),
    sentDayBeforeMessage: true,
    sentHourBeforeMessage: true,
    sitter: "5758b05d2b8530815a5fb1b4",
    client: "5758b0022b8530815a5fb1b3"
  };

  describe('#create()', function () {
    it('should create a new Schedule', function (done) {
      // Create a User object to pass to User.create()

      Schedule.create(schedule,(err, createdSchedule) => {
        should.not.exist(err);

        createdSchedule.startDate.should.equal(schedule.startDate);
        createdSchedule.endDate.should.equal(schedule.endDate);
        createdSchedule.sentDayBeforeMessage.should.equal(schedule.sentDayBeforeMessage);
        createdSchedule.sentHourBeforeMessage.should.equal(schedule.sentHourBeforeMessage);
        done();
      });

    });

    it('should find schedules with "sentDayBeforeMessage" false', function (done) {
      let sch = merge({}, schedule, {
        sentDayBeforeMessage: false
      });

      Schedule.create(sch, (err, createdSchedule) => {
        Schedule.find({sentDayBeforeMessage: false})
          .exec((err, schedules) => {
            should.not.exist(err);

            schedules.length.should.equal(1);
            done();
          });
      });
    });

    it('should find schedules from tomorrows date', function (done) {
      let date = moment('2016-06-09T16:30:00-0700');
      let startOfDay = date.clone().startOf('day');

      let sch = merge({}, schedule, {
        startDate: date.clone().add(1, 'days').format()
      });

      Schedule.create(sch, (err, createdSchedule) => {
        Schedule.find({
          startDate: {
            $gte: startOfDay.format(),
            $lt: date.clone().add(25, 'hours').format()
          }
        }).exec((err, schedules) => {
            should.not.exist(err);

            schedules.length.should.equal(1);
            done();
          });
      });
    });

    it('should find schedules within an hour', function (done) {
      let date = moment('2016-06-09T16:30:00-0700');

      let sch = merge({}, schedule, {
        startDate: date.clone().subtract(59, 'minutes').format()
      });

      Schedule.create(sch, (err, createdSchedule) => {
        Schedule.find({
          startDate: {
            $gte: date.clone().subtract(60, 'hours').format(),
            $lt: date.format()
          }
        }).exec((err, schedules) => {
            should.not.exist(err);

            schedules.length.should.equal(1);
            done();
          });
      });
    });

    it('should find schedules within an hour and sentHourBeforeMessage is false', function (done) {
      let date = moment('2016-06-09T16:30:00-0700');

      let sch = merge({}, schedule, {
        startDate: date.clone().subtract(59, 'minutes').format(),
        sentHourBeforeMessage: false
      });

      Schedule.create(sch, (err, createdSchedule) => {
        Schedule.find({
          startDate: {
            $gte: date.clone().subtract(60, 'hours').format(),
            $lt: date.format()
          },
          sentHourBeforeMessage: false
        }).exec((err, schedules) => {
            should.not.exist(err);

            schedules.length.should.equal(1);
            done();
          });
      });
    });
  });
});
