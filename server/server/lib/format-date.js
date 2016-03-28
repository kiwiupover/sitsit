import moment from 'moment-timezone';

function formatDate(date, format='L') {

  return moment.tz(date, "America/Los_Angeles").format(format);
}

export default formatDate;
