import _ from 'lodash';

const makeDiff = (data1, data2 = {}) => {
  const keysFromFirstObject = Object.keys(data1);
  const keysFromSecondObject = Object.keys(data2);
  const unionKeys = _.union(keysFromFirstObject, keysFromSecondObject);
  const fullSortedKeys = _.sortBy(unionKeys);
  return fullSortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (!_.has(data1, key)) {
      return ({ type: 'added', key, value: value2 });
    }
    if (!_.has(data2, key)) {
      return ({ type: 'deleted', key, value: value1 });
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return ({ type: 'nested', key, children: makeDiff(value1, value2) });
    }
    if (value1 === value2) {
      return ({ type: 'notChanged', key, value: value1 });
    }
    return ({
      type: 'changed',
      key,
      value1,
      value2,
    });
  });
};

export default makeDiff;
