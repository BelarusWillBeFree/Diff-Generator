import _ from 'lodash';

const getFormatedValue = (value) => {
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

const getNameParent = (parent) => (parent === '' ? '' : `${parent}.`);

const getValue = (value) => (_.isObject(value) ? '[complex value]' : getFormatedValue(value));

const startPlain = (diffObject, parent = '') => {
  const linesDiff = diffObject.flatMap((node) => {
    switch (node.type) {
      case 'added':
        return `Property '${getNameParent(parent)}${node.key}' was added with value: ${getValue(node.value)}`;
      case 'deleted':
        return `Property '${getNameParent(parent)}${node.key}' was removed`;
      case 'changed':
        return `Property '${getNameParent(parent)}${node.key}' was updated. From ${getValue(node.value1)} to ${getValue(node.value2)}`;
      case 'nested':
        return startPlain(node.children, `${getNameParent(parent)}${node.key}`);
      default:
        return [];
    }
  });
  return linesDiff.join('\n');
};

export default startPlain;
