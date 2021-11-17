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

  test('no exist extension', () => {
  const sourcePath1 = getFixturePath('file1.jso');
  const sourcePath2 = getFixturePath('file2.json');
  const fixResultFile = readFile('fixturefile1.json');
  expect(()=>(gendiff(sourcePath1, sourcePath2, 'stylish'))).toThrow();
  });

test('gendiffYAML', () => {
  const sourcePath1 = getFixturePath('file1.yaml');
  const sourcePath2 = getFixturePath('file2.yaml');
  const fixResultFile = readFile('fixturefile1.json');
  expect(gendiff(sourcePath1, sourcePath2, 'stylish')).toEqual(fixResultFile);
});

test('gendiffYAML_file1_not_exist', () => {
  const sourcePath1 = getFixturePath('file1.yaml1');
  const sourcePath2 = getFixturePath('file2.yaml');
  expect(()=>(gendiff(sourcePath1, sourcePath2, 'stylish'))).toThrow();
});

test('testComplexStructureJSON', () => {
  const sourcePath1 = getFixturePath('complexStruc1.json');
  const sourcePath2 = getFixturePath('complexStruc2.json');
  const fixResultFile = readFile('fextureComplex.json');
  expect(gendiff(sourcePath1, sourcePath2, 'stylish')).toEqual(fixResultFile);
});

test('testComplexStructureYAML default formate', () => {
  const sourcePath1 = getFixturePath('complexStruc1.yaml');
  const sourcePath2 = getFixturePath('complexStruc2.yaml');
  const fixResultFile = readFile('fextureComplex.json');
  expect(gendiff(sourcePath1, sourcePath2)).toEqual(fixResultFile);
});

test('testPlainFormatter', () => {
  const sourcePath1 = getFixturePath('complexStruc1.json');
  const sourcePath2 = getFixturePath('complexStruc2.json');
  const fixResultFile = readFile('plain');
  expect(gendiff(sourcePath1, sourcePath2, 'plain')).toEqual(fixResultFile);
});

test('test json Formatter', () => {
  const sourcePath1 = getFixturePath('complexStruc1.json');
  const sourcePath2 = getFixturePath('complexStruc2.json');
  const fixResultFile = readFile('jsonFormat.json');
  expect(gendiff(sourcePath1, sourcePath2, 'json')).toEqual(fixResultFile);
});