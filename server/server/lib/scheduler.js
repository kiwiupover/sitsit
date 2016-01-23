import schedule from 'node-schedule'
import sendMessages from './send-messages';
import Schedule from '../api/schedule/schedule.model';
import moment from 'moment';

const hourly = new schedule.RecurrenceRule();
hourly.minutes = 59;




let today = moment().startOf('day')
let tomorrow = moment(today).add(1, 'days')

export default function() {
  // schedule.scheduleJob(hourly, function(){
  //   Schedule.find({
  //     startDate: {
  //       $gte: today.toDate()
  //     }
  //   }).exec(function (err, schedules) {
  //     if(err) { console.log('err', err); }
  //
  //     schedules.forEach((schedule) => {
  //       sendMessages(schedule)
  //     });
  //
  //     console.log('schedules', schedules.length);
  //   });
  // });
}
