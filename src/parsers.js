import yaml from 'js-yaml';

const getParseData = (dataFromFile, extname) => {
  switch (extname) {
    case 'json':
      return JSON.parse(dataFromFile);
    case 'yml':
    case 'yaml':
      return yaml.load(dataFromFile);
    default:
      throw new Error('extension not defined');
  }
};

export default getParseData;
