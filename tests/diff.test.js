import path from 'path';
import { fileURLToPath } from 'url';
import { describe, expect, it } from 'vitest';
import parse from '../src/parser.js';
import genDiff from '../src/diff.js';
import formatStylish from '../src/stylish.js';

const dirName = path.dirname(fileURLToPath(import.meta.url));

const readFixture = (name) => parse(path.join(dirName, '../fixtures/nested', name));

const expected = `
{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}
`.trim();

describe('nested diff', () => {
  it('builds the internal diff tree (json fixture)', () => {
    const diff = genDiff(readFixture('file1.json'), readFixture('file2.json'));
    expect(diff.map((item) => item.key)).toEqual(['common', 'group1', 'group2', 'group3']);
    const common = diff[0];
    expect(common.children.map((item) => item.key)).toEqual([
      'follow', 'setting1', 'setting2', 'setting3', 'setting4', 'setting5', 'setting6',
    ]);
    const follow = common.children.find((item) => item.key === 'follow');
    expect(follow.status).toBe('added');
    const group2 = diff[2];
    expect(group2.status).toBe('removed');
    const group3 = diff[3];
    expect(group3.status).toBe('added');
  });

  it('formats the stylish output for the json fixture', () => {
    const result = formatStylish(genDiff(readFixture('file1.json'), readFixture('file2.json')));
    expect(result).toBe(expected);
  });

  it('formats the stylish output for the yaml fixture', () => {
    const result = formatStylish(genDiff(readFixture('file1.yml'), readFixture('file2.yml')));
    expect(result).toBe(expected);
  });

  it('handles flat files (regression)', () => {
    const root1 = parse(path.join(dirName, '../file1.json'));
    const root2 = parse(path.join(dirName, '../file2.json'));
    const result = formatStylish(genDiff(root1, root2));
    expect(result).toBe('{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}');
  });
});
