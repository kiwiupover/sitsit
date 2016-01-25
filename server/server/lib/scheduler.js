import schedule from 'node-schedule'
import sendMessages from './send-messages';
import Schedule from '../api/schedule/schedule.model';
import moment from 'moment';

const hourly = new schedule.RecurrenceRule();
hourly.minutes = 59;

export default function() {
  schedule.scheduleJob(hourly, function(){
    console.log('scheduler');

    let now = moment().utcOffset(800);
    let in1hour = moment(now).subtract(1, 'hours');
    let tomorrow = moment(now).add(1, 'days');
    let tomorrowPlus1Hour = moment(tomorrow).add(1, 'hours');

    Schedule.find({

      startDate: {
        $gte: tomorrow.toDate(),
        $lt: tomorrowPlus1Hour.toDate()
      }

    }).exec(function (err, schedules) {
      if(err) { console.log('err', err); }

      schedules.forEach((schedule) => {
        if (schedule.sentDayBeforeMessage) {
          return;
        }

        schedule.sentDayBeforeMessage = true;
        schedule.save((err)=>{
          if (err) { console.log('schedule save error', err)}
        });

        sendMessages(schedule);
      });

      console.log('schedules', schedules.length);
    });
  });
}
