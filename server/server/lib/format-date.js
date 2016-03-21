import moment from 'moment';

function formatDate(date, format='L') {
  return moment.utc(date).format(format);
}

export default formatDate;
