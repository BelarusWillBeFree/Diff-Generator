import yaml from 'js-yaml';

const throwError = (textMess) => { throw new Error(textMess); };

const getDataFromFile = (dataInfo) => {
  if (dataInfo === undefined) {
    throwError('extension is empty');
  }
  try {
    switch (dataInfo.ext) {
      case '.json':
        return JSON.parse(dataInfo.data);
      case '.yml':
      case '.yaml':
        return yaml.load(dataInfo.data);
      default:
        throwError('extension not defined');
    }
  } catch (err) {
    throwError(`error parse ${err}`);
  }
  throwError('format not defined');
  return {};
};

export default getDataFromFile;
