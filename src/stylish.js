import lodash from 'lodash';
import { STATUS, isObject } from './diff.js';

const { sortBy } = lodash;

const INDENT = 4;

const pad = (depth, offset = 0) => ' '.repeat(depth * INDENT + offset);

const formatValue = (value) => {
  if (value === undefined) return '';
  if (value === null) return 'null';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
};

const itemsFromObject = (obj) => sortBy(Object.keys(obj)).map((key) => {
  const value = obj[key];
  if (isObject(value)) {
    return { status: STATUS.SAME, key, children: itemsFromObject(value) };
  }
  return { status: STATUS.SAME, key, value };
});

function formatMarked(mark, { key, value }, depth) {
  const lines = [];
  if (isObject(value)) {
    lines.push(`${pad(depth, -2)}${mark} ${key}: {`);
    // eslint-disable-next-line no-use-before-define
    lines.push(...formatItems(itemsFromObject(value), depth + 1));
    lines.push(`${pad(depth)}}`);
  } else {
    lines.push(`${pad(depth, -2)}${mark} ${key}: ${formatValue(value)}`);
  }
  return lines;
}

function formatItems(items, depth) {
  const lines = [];
  items.forEach((item) => {
    if (item.children) {
      lines.push(`${pad(depth)}${item.key}: {`);
      lines.push(...formatItems(item.children, depth + 1));
      lines.push(`${pad(depth)}}`);
    } else if (item.status === STATUS.SAME) {
      lines.push(`${pad(depth)}${item.key}: ${formatValue(item.value)}`);
    } else if (item.status === STATUS.UPDATED) {
      lines.push(...formatMarked('-', { key: item.key, value: item.oldValue }, depth));
      lines.push(...formatMarked('+', { key: item.key, value: item.value }, depth));
    } else if (item.status === STATUS.ADDED) {
      lines.push(...formatMarked('+', item, depth));
    } else {
      lines.push(...formatMarked('-', item, depth));
    }
  });
  return lines;
}

const formatStylish = (diff) => ['{', ...formatItems(diff, 1), '}'].join('\n');

export default formatStylish;
