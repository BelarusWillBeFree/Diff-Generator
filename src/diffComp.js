import _ from 'lodash';

export const isObject = (checkValue) => (checkValue !== null && typeof checkValue === 'object');

const isObjectEmpty = (objectForCheck, defaultSign = '') => (Object.keys(objectForCheck).length === 0 ? '' : defaultSign);

const getUnionSorted = (oneObject, twoObject) => {
  const keysFromFirstObject = Object.entries(oneObject).map(([key]) => (key));
  const keysFromSecondObject = Object.entries(twoObject).map(([key]) => (key));
  const unionKeys = _.union(keysFromFirstObject, keysFromSecondObject);
  return _.sortBy(unionKeys);
};

const makeComplexDiff = (oneObject, twoObject = {}) => {
  if (!isObject(oneObject)) return oneObject;
  const fullSortedKeys = getUnionSorted(oneObject, twoObject);
  return fullSortedKeys.flatMap((key) => {
    const value1 = oneObject[key];
    const value2 = twoObject[key];
    const obj1HasKeyProperty = Object.prototype.hasOwnProperty.call(oneObject, key);
    const obj2HasKeyProperty = Object.prototype.hasOwnProperty.call(twoObject, key);
    if (obj1HasKeyProperty && obj2HasKeyProperty) {
      if (isObject(value1) && isObject(value2)) {
        return { sign: '=', key: key, value: makeComplexDiff(value1, value2) };
      }
      if (!isObject(value1) && !isObject(value2)) {
        if (value1 !== value2) {
          return [{ sign: '-', key: key, value: value1 },{ sign: '+', key: key, value: value2 }];
        }
        return { sign: '=', key: key, value: value1 };
      }
      if (isObject(value1) !== isObject(value2)) {
        return [{ sign: '-', key: key, value: makeComplexDiff(value1) },{ sign: '+', key: key, value: makeComplexDiff(value2) }];
      }
    }
    if (obj1HasKeyProperty) {
      return { sign: isObjectEmpty(twoObject, '-'), key: key, value: makeComplexDiff(value1) };
    }
    if (obj2HasKeyProperty) {
      return { sign: '+', key: key, value: makeComplexDiff(value2) };
    }
    return [];
  });
};

export default makeComplexDiff;
