import { Serializer } from 'jsonapi-serializer';
import config from '../../config/environment';
const serverUrl = config.hostUrl;

function clientSerializer(client) {

  this.serialize = function () {
    return new Serializer('clients', client, {
      id: '_id',
      topLevelLinks: { self: `http://${serverUrl}/api/clients` },
      dataLinks: {
        self: function (client) {
          return `http://${serverUrl}/api/clients/${client._id}`
        }
      },
      attributes: ['familyName', 'primaryPhone', 'secondaryPhone'],
    });
  };
}

export default clientSerializer;
