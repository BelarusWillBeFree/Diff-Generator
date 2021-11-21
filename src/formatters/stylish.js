import { isObject } from '../diffComp.js';

const getViewSymbol = (diffSymb) => {
  if (diffSymb === '=' || diffSymb.length === 0){
    return '  ';
  }
  return `${diffSymb} `;
};

const getSymBefEnd = (value, begEnd = 'begin') => {
  const symbBegEnd = begEnd === 'begin' ? '{' : '}';
  return isObject(value) ? symbBegEnd+'\n' : '';
};

const stylish = (diffObject, replacer, spacesCount, deep = 1) =>{
  if (!isObject(diffObject)){
    return String(diffObject)+'\n';
  }
  const resultFormat = diffObject.map((obj) => {
    const replacerForBegin = replacer.repeat(spacesCount * deep);
    const replacerForEnd = isObject(obj.value) ? replacer.repeat(spacesCount * deep+2):'';
    return replacerForBegin
                + `${getViewSymbol(obj.sign)}`
                + `${obj.key}: `
                + `${getSymBefEnd(obj.value)}`
                + `${stylish(obj.value, replacer, spacesCount, deep + spacesCount)}`
                +  replacerForEnd
                + `${getSymBefEnd(obj.value, 'end')}`;
  }).join('');
  return resultFormat;
};

const startStylish = (diffObject, replacer = ' ', spacesCount = 2) => {
  return '{\n'+stylish(diffObject, replacer, spacesCount)+'}';
};

export default startStylish;
