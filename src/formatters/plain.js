import { isObject } from '../diffComp.js';

const getFormatedValue = (value) => {
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

const getNameParents = (parents) => (parents === '' ? '' : `${parents}.`);

const getValue = (node) => (isObject(node.value) ? '[complex value]' : getFormatedValue(node.value));

const addedValue = (node, index, nodes, parents) => {
  if (index >= 1 && nodes[index - 1].key === node.key) return [];
  return `Property '${getNameParents(parents)}${node.key}' was added with value: ${getValue(node)}`;
};

const updatedValue = (node, index, nodes, parents) => {
  if ((index + 1 <= nodes.length - 1) && nodes[index + 1].key === node.key) {
    const valueNextElem = isObject(nodes[index + 1].value) ? '[complex value]' : getFormatedValue(nodes[index + 1].value);
    return `Property '${getNameParents(parents)}${node.key}' was updated. From ${getValue(node)} to ${valueNextElem}`;
  }
  return `Property '${getNameParents(parents)}${node.key}' was removed`;
};

const startPlain = (diffObject, parents = '') => {
  const linesWithEmpty = diffObject.flatMap((node, index, nodes) => {
    switch (node.sign){
      case '+':
        return addedValue(node, index, nodes, parents);
      case '-':
        return updatedValue(node, index, nodes, parents);
      default:
       return isObject(node.value) ? startPlain(node.value, `${getNameParents(parents)}${node.key}`) : [];
    }
  });
  const linesNoEmpty = linesWithEmpty.filter((value) => (value.length > 0));
  const linesJoinOneText = linesNoEmpty.join('\n');
  return linesJoinOneText;
};

export default startPlain;
