import _ from 'lodash';

export const isObject = (checkValue) => (checkValue !== null && typeof checkValue === 'object');

const isObjectEmpty = (objectForCheck, defaultSign = '') => (Object.keys(objectForCheck).length === 0 ? '' : defaultSign);

const getUnionSorted = (oneObject, twoObject) => {
  const keysFromFirstObject = Object.entries(oneObject).map(([key]) => (key));
  const keysFromSecondObject = Object.entries(twoObject).map(([key]) => (key));
  const unionKeys = _.union(keysFromFirstObject, keysFromSecondObject);
  return _.sortBy(unionKeys);
};
const addValues = (oneObject, twoObject, key, values) => {
  const obj1HasKeyProperty = Object.prototype.hasOwnProperty.call(oneObject, key);
  const obj2HasKeyProperty = Object.prototype.hasOwnProperty.call(twoObject, key);
  const value1 = oneObject[key];
  const value2 = twoObject[key];
  if (obj1HasKeyProperty && obj2HasKeyProperty) {
    if (isObject(value1) && isObject(value2)) {
      return { sign: '=', key: key, value: values.comp };
    }
    if (!isObject(value1) && !isObject(value2)) {
      if (value1 !== value2) {
        return [{ sign: '-', key: key, value: value1 }, { sign: '+', key: key, value: value2 }];
      }
      return { sign: '=', key: key, value: value1 };
    }
    if (isObject(value1) !== isObject(value2)) {
      return [{ sign: '-', key: key, value: values.fir }, { sign: '+', key: key, value: values.sec }];
    }
  }
  if (obj1HasKeyProperty) {
    const sign = isObjectEmpty(twoObject, '-');
    return { sign: sign, key: key, value: values.fir };
  }
  if (obj2HasKeyProperty) {
    return { sign: '+', key: key, value: values.sec };
  }
  return [];
};

const makeComplexDiff = (oneObject, twoObject = {}) => {
  if (!isObject(oneObject)) return oneObject;
  const fullSortedKeys = getUnionSorted(oneObject, twoObject);
  return fullSortedKeys.flatMap((key) => {
    const compexValue = makeComplexDiff(oneObject[key], twoObject[key]);
    const valueFirObj = makeComplexDiff(oneObject[key]);
    const valueSecObj = makeComplexDiff(twoObject[key]);
    return addValues(oneObject, twoObject, key, {comp: compexValue, fir: valueFirObj, sec: valueSecObj});
  });
};

export default makeComplexDiff;
