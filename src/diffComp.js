import _ from 'lodash';

export const isObject = (checkValue) => (checkValue !== null && typeof checkValue === 'object');

const addObj = (inpSign, inpKey, inpValue) => ({ sign: inpSign, key: inpKey, value: inpValue });

const isObjectEmpty = (objectForCheck, defaultSign = '') => (Object.keys(objectForCheck).length === 0 ? '' : defaultSign);

const makeComplexDiff = (oneObject, twoObject = {}) => {
  if (!isObject(oneObject)) {
    return oneObject;
  }
  const keysFromFirstObject = Object.entries(oneObject).map(([key]) => (key));
  const keysFromSecondObject = Object.entries(twoObject).map(([key]) => (key));
  const unionKeys = _.union(keysFromFirstObject, keysFromSecondObject);
  const fullSortedKeys = _.sortBy(unionKeys);
  return fullSortedKeys.flatMap((key) => {
    const value1 = oneObject[key];
    const value2 = twoObject[key];
    const obj1HasKeyProperty = Object.prototype.hasOwnProperty.call(oneObject, key);
    const obj2HasKeyProperty = Object.prototype.hasOwnProperty.call(twoObject, key);
    if (obj1HasKeyProperty && obj2HasKeyProperty) {
      if (isObject(value1) && isObject(value2)) {
        return addObj('=', key, makeComplexDiff(value1, value2));
      }
      if (!isObject(value1) && !isObject(value2)) {
        if (value1 !== value2) {
          return [addObj('-', key, value1), addObj('+', key, value2)];
        }
        return addObj('=', key, value1);
      }
      if (isObject(value1) !== isObject(value2)) {
        return [addObj('-', key, makeComplexDiff(value1)), addObj('+', key, makeComplexDiff(value2))];
      }
    }
    if (obj1HasKeyProperty) {
      return addObj(isObjectEmpty(twoObject, '-'), key, makeComplexDiff(value1));
    }
    if (obj2HasKeyProperty) {
      return addObj('+', key, makeComplexDiff(value2));
    }
    return [];
  });
};

export default makeComplexDiff;
