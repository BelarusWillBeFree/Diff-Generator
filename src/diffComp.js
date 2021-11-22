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
        const valTwoObj = makeComplexDiff(value1, value2);
        return { sign: '=', key: key, value: valTwoObj };
      }
      if (!isObject(value1) && !isObject(value2)) {
        if (value1 !== value2) {
          return [{ sign: '-', key: key, value: value1 },{ sign: '+', key: key, value: value2 }];
        }
        return { sign: '=', key: key, value: value1 };
      }
      if (isObject(value1) !== isObject(value2)) {
        const valueFirstObj = makeComplexDiff(value1);
        const valueSecObj = makeComplexDiff(value2);
        return [{ sign: '-', key: key, value: valueFirstObj },{ sign: '+', key: key, value: valueSecObj }];
      }
    }
    if (obj1HasKeyProperty) {
      const sign = isObjectEmpty(twoObject, '-');
      const valOnlyOneObj = makeComplexDiff(value1);
      return { sign: sign, key: key, value: valOnlyOneObj };
    }
    if (obj2HasKeyProperty) {
      const valueOnlyTwoObj = makeComplexDiff(value2);
      return { sign: '+', key: key, value: valueOnlyTwoObj };
    }
    return [];
  });
};

export default makeComplexDiff;
