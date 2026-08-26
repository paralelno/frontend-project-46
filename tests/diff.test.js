import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { describe, expect, it } from 'vitest';
import parse from '../src/parser.js';
import genDiff from '../src/diff.js';
import formatPlain from '../src/formatters/plain.js';
import formatStylish from '../src/formatters/stylish.js';
import formatJson from '../src/formatters/json.js';
import getFormatter, { formatters, DEFAULT_FORMATTER } from '../src/formatters/index.js';

const dirName = path.dirname(fileURLToPath(import.meta.url));

const readFixture = (name) => parse(path.join(dirName, '../fixtures/nested', name));
const readExpected = (name) => fs.readFileSync(path.join(dirName, 'fixtures', name), 'utf-8').replace(/\n$/, '');

describe('nested diff — internal tree', () => {
  it('builds the diff tree (json fixture)', () => {
    const diff = genDiff(readFixture('file1.json'), readFixture('file2.json'));
    expect(diff.map((item) => item.key)).toEqual(['common', 'group1', 'group2', 'group3']);
    expect(diff[0].children.map((item) => item.key)).toEqual([
      'follow', 'setting1', 'setting2', 'setting3', 'setting4', 'setting5', 'setting6',
    ]);
    expect(diff[0].children.find((item) => item.key === 'follow').status).toBe('added');
    expect(diff[2].status).toBe('removed');
    expect(diff[3].status).toBe('added');
  });

  it('builds the diff tree (yaml fixture)', () => {
    const diff = genDiff(readFixture('file1.yml'), readFixture('file2.yml'));
    expect(diff.map((item) => item.key)).toEqual(['common', 'group1', 'group2', 'group3']);
  });
});

describe('stylish formatter', () => {
  it('formats nested json fixture', () => {
    expect(formatStylish(genDiff(readFixture('file1.json'), readFixture('file2.json'))))
      .toBe(readExpected('expected-stylish.txt'));
  });

  it('formats nested yaml fixture', () => {
    expect(formatStylish(genDiff(readFixture('file1.yml'), readFixture('file2.yml'))))
      .toBe(readExpected('expected-stylish.txt'));
  });

  it('handles flat files', () => {
    const root1 = parse(path.join(dirName, '../file1.json'));
    const root2 = parse(path.join(dirName, '../file2.json'));
    expect(formatStylish(genDiff(root1, root2))).toBe(readExpected('expected-flat.txt'));
  });
});

describe('plain formatter', () => {
  it('formats nested json fixture', () => {
    expect(formatPlain(genDiff(readFixture('file1.json'), readFixture('file2.json'))))
      .toBe(readExpected('expected-plain.txt'));
  });

  it('formats nested yaml fixture', () => {
    expect(formatPlain(genDiff(readFixture('file1.yml'), readFixture('file2.yml'))))
      .toBe(readExpected('expected-plain.txt'));
  });
});

describe('json formatter', () => {
  it('serialises the diff tree as JSON', () => {
    const diff = genDiff(readFixture('file1.json'), readFixture('file2.json'));
    const result = formatJson(diff);
    const parsed = JSON.parse(result);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed[0].key).toBe('common');
    expect(parsed[0].children).toBeDefined();
    expect(parsed[2]).toMatchObject({ status: 'removed', key: 'group2' });
    expect(parsed[3]).toMatchObject({ status: 'added', key: 'group3' });
  });

  it('is valid pretty-printed JSON (2-space indent)', () => {
    const diff = genDiff(readFixture('file1.json'), readFixture('file2.json'));
    const result = formatJson(diff);
    expect(result).toBe(JSON.stringify(diff, null, 2));
    expect(result).toContain('\n  ');
  });
});

describe('formatter selection', () => {
  it('exposes plain, stylish and json formatters', () => {
    expect(Object.keys(formatters)).toEqual(['plain', 'stylish', 'json']);
    expect(DEFAULT_FORMATTER).toBe(formatStylish);
  });

  it('falls back to stylish for unknown formats', () => {
    const diff = genDiff(readFixture('file1.json'), readFixture('file2.json'));
    expect(getFormatter('bogus')(diff)).toBe(formatStylish(diff));
  });
});
