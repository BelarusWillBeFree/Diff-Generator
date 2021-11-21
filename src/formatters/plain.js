import { isObject } from '../diffComp.js';

const getFormatedValue = (value) => {
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

const getNameParents = (parents) => ( parents === '' ? '' : `${parents}.`);

const getValue = (node) => (isObject(node.value) ? '[complex value]' : getFormatedValue(node.value));

const startPlain = (diffObject, parents = '') => {
  const lines = diffObject.flatMap((node, index, nodes) => {
    if (node.sign === '+') {
      if (index >= 1 && nodes[index - 1].key === node.key) return [];
      return `Property '${getNameParents(parents)}${node.key}' was added with value: ${getValue(node)}`;
    }
    if (node.sign === '-') {
      if ((index + 1 <= nodes.length - 1) && nodes[index + 1].key === node.key) {
        const valueNextElem = isObject(nodes[index + 1].value) ? '[complex value]' : getFormatedValue(nodes[index + 1].value);
        return `Property '${getNameParents(parents)}${node.key}' was updated. From ${getValue(node)} to ${valueNextElem}`;
      }
      return `Property '${getNameParents(parents)}${node.key}' was removed`;
    }
    return isObject(node.value) ? startPlain(node.value, `${getNameParents(parents)}${node.key}`) : [];
  }).filter((value) => (value.length > 0)).join('\n');
  return lines;
};

export default startPlain;
