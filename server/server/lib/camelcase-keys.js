import mapKeys from 'lodash/mapKeys';
import camelCase from 'lodash/camelCase';

export default function(obj){
  return mapKeys(obj, function(value, key){
    return camelCase(key);
  });
}
