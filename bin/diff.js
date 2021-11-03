import _ from 'lodash';

const getDiffOneObject = (oneObject, twoObject) => {
    if (oneObject === undefined) return '';

    return Object.entries(oneObject).flatMap(([key, value])=>{
        if (twoObject !== undefined){
            if (twoObject.hasOwnProperty(key)){
                if (value === twoObject[key]){
                    return {sign:'  ', key: key + ': ', value: value + '\n'};
                } else {
                    return [{sign:'- ', key: key + ': ', value: value + '\n'},{sign:'+ ', key: key + ': ', value: twoObject[key] + '\n'}];
                }
            }
        }
        return {sign:'- ', key: key + ': ', value: value + '\n'};
    });
}
const getDiffTwoObject = (oneObject, twoObject) => {
    if (twoObject !== undefined){
        return Object.entries(twoObject).filter((item) => {
            if (oneObject !== undefined) return !oneObject.hasOwnProperty(item[0]);
            return true;
        }
        ).flatMap(([key, value])=>({sign:'+ ', key: key + ': ', value: value + '\n'}));
    }
    return '';
}

const diffObjects = (oneObject, twoObject) => {
    const diffFirstObject = getDiffOneObject(oneObject, twoObject);
    const diffTwoObject = getDiffTwoObject(oneObject, twoObject);
    const concatArray = _.concat(diffFirstObject,diffTwoObject);
    const sortedArray = _.sortBy(concatArray,['key']);
    const resultString = sortedArray.reduce((acc, elem)=>{
        return acc + _.join(Object.values(elem),'');
    },'');
    if (resultString.length > 0)
        return '{\n' + resultString + '}';
    return resultString;
};

export default diffObjects;
