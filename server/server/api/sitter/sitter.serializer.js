import { Serializer } from 'jsonapi-serializer';

const serverUrl = 'localhost:9000';

function sitterSerializer(sitter) {

  this.serialize = function () {
    return new Serializer('sitters', sitter, {
      id: '_id',
      topLevelLinks: { self: `http://${serverUrl}/api/sitters` },
      dataLinks: {
        self: function (sitter) {
          return `http://${serverUrl}/api/sitters/${sitter._id}`
        }
      },
      attributes: ['firstName', 'phone', 'parentPrimaryPhone', 'parentSecondayPhone'],
    });
  };
}

export default sitterSerializer;
