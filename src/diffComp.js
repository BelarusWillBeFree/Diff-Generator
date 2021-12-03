import _ from 'lodash';

const valuesDelAndAdd = (key, value1, value2) => {
  const subNode = { type: 'deleted', key, value: value1 };
  const plusNode = { type: 'added', key, value: value2 };
  return [subNode, plusNode];
};

const addValues = (oneObject, twoObject, key, values) => {
  const obj1HasKeyProperty = _.has(oneObject, key);
  const obj2HasKeyProperty = _.has(twoObject, key);
  const value1 = oneObject[key];
  const value2 = twoObject[key];
  if (!obj1HasKeyProperty) {
    return {type: 'added', key, value: values.sec};
  }
  if (!obj2HasKeyProperty) {
    const type = Object.keys(twoObject).length === 0 ? '' : 'deleted';
    return {type:type, key, value: values.fir};
  }
  if (_.isObject(value1) && _.isObject(value2)) {
    return {type:'notChanged', key, value:values.comp};
  }
  if (value1 !== value2) return valuesDelAndAdd(key, values.fir, values.sec);
  return {type:'notChanged', key, value: value1};
};

const makeDiffValue = (oneObject, twoObject = {}) => {
  if (!_.isObject(oneObject)) return oneObject;
  if (!_.isObject(twoObject)) {twoObject = {};};
  const keysFromFirstObject = Object.keys(oneObject)
  const keysFromSecondObject = Object.keys(twoObject);
  const unionKeys = _.union(keysFromFirstObject, keysFromSecondObject);
  const fullSortedKeys = _.sortBy(unionKeys);
  return fullSortedKeys.flatMap((key) => {
    const compexValue = makeDiffValue(oneObject[key], twoObject[key]);
    const valueFirObj = makeDiffValue(oneObject[key]);
    const valueSecObj = makeDiffValue(twoObject[key]);
    const allValues = { comp: compexValue, fir: valueFirObj, sec: valueSecObj };
    return addValues(oneObject, twoObject, key, allValues);
  });
};

export default makeDiffValue;
