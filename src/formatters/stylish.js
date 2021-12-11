import _ from 'lodash';

const getSymbForView = (type) => {
  switch (type) {
    case 'added':
      return '+ ';
    case 'deleted':
      return '- ';
    default:
      return '  ';
  }
};

const getObjectView = (diffObject, replacer, spacesCount, deep = 1) =>{
  if (!_.isObject(diffObject)) {
    return `${String(diffObject)}\n`;
  }
  const replacerForBegin = replacer.repeat(spacesCount * deep);
  const replacerForEnd = replacer.repeat(spacesCount * deep-2);
  const resultFormat = Object.entries(diffObject).map(([key, value]) => {
    const viewValue = getObjectView(value, replacer, spacesCount, deep + spacesCount);
    return `${replacerForBegin}  ${key}: ${viewValue}`;//${replacerForEnd}
  }).join('');
  return `{\n${resultFormat}${replacerForEnd}}\n`;
};

const stylish = (diffObject, replacer, spacesCount, deep = 1) => {
  if (!_.isObject(diffObject)) {
    return `${String(diffObject)}\n`;
  }
  const resultFormat = diffObject.map((obj) => {
    const replacerForBegin = replacer.repeat(spacesCount * deep);
    const replacerForEnd = replacer.repeat(spacesCount * deep + 2);
    if (obj.type === 'changed') {
      const value1ForView = _.isObject(obj.value1) ? getObjectView(obj.value1, replacer, spacesCount, deep + spacesCount) : `${obj.value1}\n`;
      const value2ForView = _.isObject(obj.value2) ? getObjectView(obj.value2, replacer, spacesCount, deep + spacesCount) : `${obj.value2}\n`;
      return `${replacerForBegin}- ${obj.key}: ${value1ForView}${replacerForBegin}+ ${obj.key}: ${value2ForView}`;
    }
    if (obj.type !== 'nested') {
      const valueForView = _.isObject(obj.value) ? getObjectView(obj.value, replacer, spacesCount, deep + spacesCount) : `${obj.value}\n`;
      return `${replacerForBegin}${getSymbForView(obj.type)}${obj.key}: ${valueForView}`;
    }
    const value = stylish(obj.children, replacer, spacesCount, deep + spacesCount);
    const result = `${replacerForBegin}${getSymbForView(obj.type)}${obj.key}: {\n${value}${replacerForEnd}}\n`;
    return result;
  }).join('');
  return resultFormat;

};

const startStylish = (diffObject, replacer = ' ', spacesCount = 2) => (`{\n${stylish(diffObject, replacer, spacesCount)}}`);

export default startStylish;
