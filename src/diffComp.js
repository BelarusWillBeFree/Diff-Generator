import _ from 'lodash';

const addNode = (type, key, value) => {
  const newNode = { type, key, value };
  return newNode;
};

const addSubPlus = (key, value1, value2) => {
  const subNode = { type: 'deleted', key, value: value1 };
  const plusNode = { type: 'added', key, value: value2 };
  return [subNode, plusNode];
};

const twoObjHasSameKey = (value1, value2, key, values) => {
  const isObjValue1 = _.isObject(value1);
  const isObjValue2 = _.isObject(value2);
  if (isObjValue1 && isObjValue2) {
    return addNode('notChanged', key, values.comp);
  }
  if (!isObjValue1 && !isObjValue2) {
    if (value1 !== value2) return addSubPlus(key, value1, value2);
    return addNode('notChanged', key, value1);
  }
   return addSubPlus(key, values.fir, values.sec);
};

const addValues = (oneObject, twoObject, key, values) => {
  const obj1HasKeyProperty = Object.prototype.hasOwnProperty.call(oneObject, key);
  const obj2HasKeyProperty = Object.prototype.hasOwnProperty.call(twoObject, key);
  const value1 = oneObject[key];
  const value2 = twoObject[key];
  if (obj1HasKeyProperty && obj2HasKeyProperty) {
    return twoObjHasSameKey(value1, value2, key, values);
  }
  if (obj1HasKeyProperty) {
    const type = Object.keys(twoObject).length === 0 ? '' : 'deleted';
    const addedNode = addNode(type, key, values.fir);
    return addedNode;
  }
  if (obj2HasKeyProperty) {
    const addedNode = addNode('added', key, values.sec);
    return addedNode;
  }
  return [];
};

const makeComplexDiff = (oneObject, twoObject = {}) => {
  if (!_.isObject(oneObject)) return oneObject;
  const keysFromFirstObject = Object.entries(oneObject).map(([key]) => (key));
  const keysFromSecondObject = Object.entries(twoObject).map(([key]) => (key));
  const unionKeys = _.union(keysFromFirstObject, keysFromSecondObject);
  const fullSortedKeys = _.sortBy(unionKeys);
  return fullSortedKeys.flatMap((key) => {
    const compexValue = makeComplexDiff(oneObject[key], twoObject[key]);
    const valueFirObj = makeComplexDiff(oneObject[key]);
    const valueSecObj = makeComplexDiff(twoObject[key]);
    const allValues = { comp: compexValue, fir: valueFirObj, sec: valueSecObj };
    return addValues(oneObject, twoObject, key, allValues);
  });
};

export default makeComplexDiff;
