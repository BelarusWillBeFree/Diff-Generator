import _ from 'lodash';

export const isObject = (checkValue) => (checkValue !== null && typeof checkValue === 'object');

const isObjectEmpty = (objectForCheck, defaultSign = '') => (Object.keys(objectForCheck).length === 0 ? '' : defaultSign);

const getUnionSorted = (oneObject, twoObject) => {
  const keysFromFirstObject = Object.entries(oneObject).map(([key]) => (key));
  const keysFromSecondObject = Object.entries(twoObject).map(([key]) => (key));
  const unionKeys = _.union(keysFromFirstObject, keysFromSecondObject);
  return _.sortBy(unionKeys);
};

const addNode = (sign, key, value) => {
  const newNode = { sign, key, value };
  return newNode;
};

const addSubPlus = (key, value1, value2) => {
  const subNode = { sign: '-', key, value: value1 };
  const plusNode = { sign: '+', key, value: value2 };
  return [subNode, plusNode];
};

const addValues = (oneObject, twoObject, key, values) => {
  const obj1HasKeyProperty = Object.prototype.hasOwnProperty.call(oneObject, key);
  const obj2HasKeyProperty = Object.prototype.hasOwnProperty.call(twoObject, key);
  const value1 = oneObject[key];
  const value2 = twoObject[key];
  if (obj1HasKeyProperty && obj2HasKeyProperty) {
    if (isObject(value1) && isObject(value2)) {
      return addNode('=', key, values.comp);
    }
    if (!isObject(value1) && !isObject(value2)) {
      if (value1 !== value2) return addSubPlus(key, value1, value2);
      return addNode('=', key, value1);
    }
    if (isObject(value1) !== isObject(value2)) return addSubPlus(key, values.fir, values.sec);
  }
  if (obj1HasKeyProperty) {
    const sign = isObjectEmpty(twoObject, '-');
    return addNode(sign, key, values.fir);
  }
  if (obj2HasKeyProperty) {
    return addNode('+', key, values.sec);
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
    const allValues = { comp: compexValue, fir: valueFirObj, sec: valueSecObj };
    return addValues(oneObject, twoObject, key, allValues);
  });
};

export default makeComplexDiff;
