import yaml from 'js-yaml';

const getDataFromFile = (dataInfo) => {
    if (dataInfo === undefined) {
        throw new Error('extension is empty');
    };
    if (dataInfo.ext === '.json') 
        try {
            return JSON.parse(dataInfo.data);
        } catch (err) {
            throw new Error(`error parse from JSON ${err}`);
        }
    if (dataInfo.ext === '.yml' || dataInfo.ext === '.yaml') 
        try {
            return yaml.load(dataInfo.data);
        } catch (err) {
            throw new Error(`error parse from yaml ${err}`);
        }
    throw new Error(`extension not defined`);
};

export default getDataFromFile;
