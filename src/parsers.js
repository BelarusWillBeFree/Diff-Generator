import yaml from 'js-yaml';

const throwError = (textMess) => {throw new Error(textMess)};

const getDataFromFile = (dataInfo) => {
    if (dataInfo === undefined) {
        throwError('extension is empty');
    };
    if (dataInfo.ext === '.json') 
        try {
            return JSON.parse(dataInfo.data);
        } catch (err) {
            throwError(`error parse from JSON ${err}`);
        }
    if (dataInfo.ext === '.yml' || dataInfo.ext === '.yaml') 
        try {
            return yaml.load(dataInfo.data);
        } catch (err) {
            throwError(`error parse from yaml ${err}`);
        }
    throwError(`extension not defined`);
};

export default getDataFromFile;
