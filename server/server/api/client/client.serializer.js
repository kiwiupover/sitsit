import JSONAPISerializer from 'jsonapi-serializer';

const serverUrl = 'localhost:9000';

function clientSerializer(client) {

  this.serialize = function () {
    return new JSONAPISerializer('clients', client, {
      id: '_id',
      topLevelLinks: { self: `http://${serverUrl}/api/clients` },
      dataLinks: {
        self: function (client) {
          return `http://${serverUrl}/api/clients/${client._id}`
        }
      },
      attributes: ['first-name', 'phone'],
    });
  };
}

export default clientSerializer;
