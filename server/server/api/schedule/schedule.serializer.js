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
      attributes: ['startDate', 'endDate', 'sitter', 'client'],
      sitter: {
        ref: '_id',
        attributes: ['firstName', 'phone'],
        relationshipLinks: {
          "self": "http://example.com/relationships/books",
          "related": "http://example.com/books"
        },
        includedLinks: {
          self: function (schedule, sitter) {
            return `http://${serverUrl}/api/client/${sitter._id}`
          }
        }
      },
      client: {
        ref: '_id',
        attributes: ['familyName', 'phone'],
        includedLinks: {
          self: function (schedule, client) {
            return `http://${serverUrl}/api/client/${client._id}`
          }
        }
      }
    });
  };
}

export default scheduleSerializer;
