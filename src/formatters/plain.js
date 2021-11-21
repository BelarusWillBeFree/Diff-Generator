import { isObject } from '../diffComp.js';

const getFormatedValue = (value) => {
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

const startPlain = (diffObject, parents = '') => {
  const lines = diffObject.flatMap((node, index, nodes) => {
    const nameParents = parents === '' ? '' : parents + '.';
    const value = isObject(node.value) ? '[complex value]' : getFormatedValue(node.value);
    if (node.sign === '+') {
      if (index >= 1 && nodes[index - 1].key === node.key) return [];
        return `Property '${nameParents}${node.key}' was added with value: ${value}`;
      }
    if (node.sign === '-') {
      if ((index + 1 <= nodes.length - 1) && nodes[index + 1].key === node.key) {
        const valueNextElem = isObject(nodes[index + 1].value) ? '[complex value]' : getFormatedValue(nodes[index + 1].value);
        return `Property '${nameParents}${node.key}' was updated. From ${value} to ${valueNextElem}`;
      }
        return `Property '${nameParents}${node.key}' was removed`;
      }
    return isObject(node.value) ? startPlain(node.value, `${nameParents}${node.key}`) : [];
  }).filter((value) => (Array.isArray(value) && value.length === 0 ? false : true)).join('\n');
  return lines;
};

export default startPlain;