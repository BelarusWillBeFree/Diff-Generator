import yaml from 'js-yaml';

const getDataFromFile = (dataInfo) => {
    if (dataInfo.ext === '.json') 
    try {
        return JSON.parse(dataInfo.data);
    } catch (err) {
        console.log(`error ${err}`);
    }
    if (dataInfo.ext === '.yml' || dataInfo.ext === '.yaml') 
        return yaml.load(dataInfo.data);
};

export default getDataFromFile;
