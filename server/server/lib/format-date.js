import moment from 'moment';

function formatDate(date, format='L') {
  return moment(date).format(format);
}

export default formatDate;
