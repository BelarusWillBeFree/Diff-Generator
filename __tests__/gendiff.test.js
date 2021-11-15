import gendiff from '../src/index.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('gendiffJSON', () => {
  const sourcePath1 = getFixturePath('file1.json');
  const sourcePath2 = getFixturePath('file2.json');
  const fixResultFile = readFile('fixturefile1.json');
  expect(gendiff(sourcePath1, sourcePath2, 'stylish')).toEqual(fixResultFile);
  });

test('gendiffYAML', () => {
  const sourcePath1 = getFixturePath('file1.yaml');
  const sourcePath2 = getFixturePath('file2.yaml');
  const fixResultFile = readFile('fixturefile1.json');
  expect(gendiff(sourcePath1, sourcePath2, 'stylish')).toEqual(fixResultFile);
});

test('testComplexStructureJSON', () => {
  const sourcePath1 = getFixturePath('complexStruc1.json');
  const sourcePath2 = getFixturePath('complexStruc2.json');
  const fixResultFile = readFile('fextureComplex.json');
  expect(gendiff(sourcePath1, sourcePath2, 'stylish')).toEqual(fixResultFile);
});

test('testComplexStructureYAML', () => {
  const sourcePath1 = getFixturePath('complexStruc1.yaml');
  const sourcePath2 = getFixturePath('complexStruc2.yaml');
  const fixResultFile = readFile('fextureComplex.json');
  expect(gendiff(sourcePath1, sourcePath2, 'stylish')).toEqual(fixResultFile);
});