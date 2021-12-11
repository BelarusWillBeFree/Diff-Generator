import _ from 'lodash';

const makeDiff = (oneObject, twoObject = {}) => {
  const keysFromFirstObject = Object.keys(oneObject);
  const keysFromSecondObject = Object.keys(twoObject);
  const unionKeys = _.union(keysFromFirstObject, keysFromSecondObject);
  const fullSortedKeys = _.sortBy(unionKeys);
  return fullSortedKeys.map((key) => {
    const obj1HasKeyProperty = _.has(oneObject, key);
    const obj2HasKeyProperty = _.has(twoObject, key);
    const value1 = oneObject[key];
    const value2 = twoObject[key];
    if (!obj1HasKeyProperty) {
      return ({ type: 'added', key, value: value2 });
    }
    if (!obj2HasKeyProperty) {
      return ({ type: 'deleted', key, value: value1 });
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return ({ type: 'nested', key, children: makeDiff(value1, value2) });
    }
    if (value1 === value2) {
      return ({ type: 'notChanged', key, value: value1 });
    }
    return ({ type: 'changed', key, value1: oneObject[key], value2: twoObject[key] });
  });
};

export default makeDiff;
