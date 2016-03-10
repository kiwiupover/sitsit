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
      attributes: ['startDate', 'endDate', 'sentDayBeforeMessage', 'sentHourBeforeMessage', 'sitter', 'client'],
      sitter: {
        ref: '_id',
        attributes: ['firstName', 'phone'],
        relationshipLinks: {
          self: function (schedule, sitter) {
            return `http://${serverUrl}/api/sitters/${sitter._id}`
          },
          "related": `http://${serverUrl}/api/sitters`
        },
        includedLinks: {
          self: function (schedule, sitter) {
            return `http://${serverUrl}/api/sitters/${sitter._id}`
          }
        }
      },
      client: {
        ref: '_id',
        attributes: ['familyName', 'phone'],
        relationshipLinks: {
          self: function (schedule, client) {
            return `http://${serverUrl}/api/clients/${client._id}`
          },
          "related": `http://${serverUrl}/api/clients`
        },
        includedLinks: {
          self: function (schedule, client) {
            return `http://${serverUrl}/api/clients/${client._id}`
          }
        }
      }
    });
  };
}

export default scheduleSerializer;
