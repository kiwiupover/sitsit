import schedule from 'node-schedule'
import dayBeforeSchedules from './day-before';
import houeBeforeSchedules from './hour-before';

const hourly = new schedule.RecurrenceRule();
hourly.minutes = 59;

export default function() {


  schedule.scheduleJob(hourly, function(){
    houeBeforeSchedules();
    dayBeforeSchedules();
  });
}
