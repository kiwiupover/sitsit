import moment from 'moment';

function formatDate(date, format='L') {
  return moment.parseZone(date).format(format);
}

export default formatDate;
