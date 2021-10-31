import gendiff from '../bin/gendiff.js'

test('gendiff', () => {
   const positiveResult = `{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true
}`;
   expect(gendiff('./file1.json', './file2.json')).toEqual(positiveResult);
 //   expect(reverse('')).toEqual('');
  });