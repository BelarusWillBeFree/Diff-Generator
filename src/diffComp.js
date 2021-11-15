import _ from 'lodash';

export const isObject = (checkValue) => (checkValue !== null && typeof checkValue === 'object');

const addObj = (inpSign, inpKey, inpValue) => {
    return {sign:inpSign, key: inpKey, value: inpValue};
};

const isObjectEmpty = (objectForCheck, defaultSign = '') =>{
    return Object.keys(objectForCheck).length === 0 ? '' : defaultSign;
};

const makeComplexDiff = (oneObject, twoObject = {}) => {
    if (!isObject(oneObject)){
        return oneObject;
    };
    const keysFromFirstObject = Object.entries(oneObject).map(([key]) =>(key));
    const keysFromSecondObject = Object.entries(twoObject).map(([key]) =>(key));
    const fullKeys = _.union(keysFromFirstObject,keysFromSecondObject).sort();
    return fullKeys.flatMap((key)=>{
        const value1 = oneObject[key];
        const value2 = twoObject[key];
        if ((oneObject.hasOwnProperty(key)) && twoObject.hasOwnProperty(key)){
            if (isObject(value1) && isObject(value2)){
                return addObj('=', key, makeComplexDiff(value1, value2))
            };
            if (!isObject(value1) && !isObject(value2)){
                if (value1 !== value2) {
                    return [addObj('-', key, value1), addObj('+', key, value2)];
                };
                return addObj('=', key, value1);
            };
            if ( isObject(value1) !== isObject(value2) ){
                return [addObj('-', key, makeComplexDiff(value1)), addObj('+', key, makeComplexDiff(value2))];
            };
        };
        if (oneObject.hasOwnProperty(key)){
            return addObj(isObjectEmpty(twoObject, '-'), key, makeComplexDiff(value1));
        };
        if (twoObject.hasOwnProperty(key)){
            return addObj('+', key, makeComplexDiff(value2));
        };
    }).filter((value)=>(Array.isArray(value) && value.length === 0 ? false : true));
};

export default makeComplexDiff;