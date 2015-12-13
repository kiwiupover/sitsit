import JSONAPISerializer from 'jsonapi-serializer';

const serverUrl = 'localhost:9000';

function scheduleSerializer(schedule) {

  this.serialize = function () {
    return new JSONAPISerializer('schedules', schedule, {
      id: '_id',
      topLevelLinks: { self: `http://${serverUrl}/api/schedules` },
      dataLinks: {
        self: function (schedule) {
          return `http://${serverUrl}/api/schedules/${schedule._id}`
        }
      },
      attributes: ['date', '_sitter', '_client'],
      sitter: {
        id: '_id',
        ref: '_sitter',
        attributes: ['first-name', 'phone']
      },
      client: {
        id: '_id',
        ref: '_client',
        attributes: ['family-name', 'phone']
      }
    });
  };
}

export default scheduleSerializer;
