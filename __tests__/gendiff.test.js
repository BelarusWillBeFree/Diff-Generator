import gendiff from '../bin/gendiff.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff', () => {
   const positiveResult = `{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true
}`;
  const fixPath1 = getFixturePath('file1.json');
  const fixPath2 = getFixturePath('file2.json');
   expect(gendiff(fixPath1, fixPath2)).toEqual(positiveResult);
 //   expect(reverse('')).toEqual('');
  });
  //gendiff('./file1.json', './file2.json');