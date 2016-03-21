import schedule from 'node-schedule'
import sendMessages from './send-messages';
import Schedule from '../api/schedule/schedule.model';
import moment from 'moment';

const hourly = new schedule.RecurrenceRule();
hourly.minutes = 59;

export default function() {
  let now = moment().utcOffset(700);
  let in1hour = moment(now).subtract(1, 'hours');
  let tomorrowDate = moment(now).add(1, 'days');
  let tomorrowPlus1Hour = moment(tomorrow).add(1, 'hours');

  let today = {
    startTime: in1hour,
    endTime: now,
    sentMessage: 'sentHourBeforeMessage'
  }

  let tomorrow = {
    startTime: tomorrowDate,
    endTime: tomorrowPlus1Hour,
    sentMessage: 'sentDayBeforeMessage'
  }

  let sendingSchedule = [today, tomorrow];

  schedule.scheduleJob(hourly, function(){
    sendingSchedule.forEach((sender) => {

      Schedule.find({

        startDate: {
          $gte: sender.startTime.toDate(),
          $lt: sender.endTime.toDate(),
        }


      }).exec(function (err, schedules) {
        if(err) { console.log('err', err); }

        schedules.forEach((schedule) => {

          let s = schedule.toJSON();
          if (s[sender.sentMessage]) {
            return;
          }

          schedule[sender.sentMessage] = true;
          schedule.save((err)=>{
            if (err) { console.log('schedule save error', err)}
          });

          sendMessages(schedule);
        });
      });
    });
  });
}
