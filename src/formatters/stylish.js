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

const getSymBefEnd = (value, begEnd = 'begin') => {
  const symbBegEnd = begEnd === 'begin' ? '{\n' : '}\n';
  return _.isObject(value) ? symbBegEnd : '';
};

const stylish = (diffObject, replacer, spacesCount, deep = 1) => {
  if (!_.isObject(diffObject)) {
    return `${String(diffObject)}\n`;
  }
  const resultFormat = diffObject.map((obj) => {
    const replacerForBegin = replacer.repeat(spacesCount * deep);
    const replacerForEnd = _.isObject(obj.value) ? replacer.repeat(spacesCount * deep + 2) : '';
    return `${replacerForBegin}${getSymbForView(obj.type)}${obj.key}: ${getSymBefEnd(obj.value)}${stylish(obj.value, replacer, spacesCount, deep + spacesCount)}${replacerForEnd}${getSymBefEnd(obj.value, 'end')}`;
  }).join('');
  return resultFormat;
};

const startStylish = (diffObject, replacer = ' ', spacesCount = 2) => (`{\n${stylish(diffObject, replacer, spacesCount)}}`);

export default startStylish;
