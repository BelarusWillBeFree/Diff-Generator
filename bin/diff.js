import _ from 'lodash';

const diffObjects = (oneObject, twoObject) => {
    const diffFirstObject = Object.entries(oneObject).flatMap(([key, value])=>{
        if (twoObject.hasOwnProperty(key)){
            if (value === twoObject[key]){
                return {sign:'  ', key: key + ': ', value: value + '\n'};
            } else {
                return [{sign:'- ', key: key + ': ', value: value + '\n'},{sign:'+ ', key: key + ': ', value: twoObject[key] + '\n'}];
            }
        }
        return {sign:'- ', key: key + ': ', value: value + '\n'};
    });
    const diffTwoObject = Object.entries(twoObject).filter((item) => (!oneObject.hasOwnProperty(item[0]))
    ).flatMap(([key, value])=>({sign:'+ ', key: key + ': ', value: value + '\n'}));
    const concatArray = _.concat(diffFirstObject,diffTwoObject);
    const sortedArray = _.sortBy(concatArray,['key']);
    const resultString = sortedArray.reduce((acc, elem)=>{
        return acc + _.join(Object.values(elem),'');
    },'');
    return '{\n' + resultString + '}';
};

export default diffObjects;
