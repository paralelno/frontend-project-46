import { isObject } from '../diff.js';

const formatValue = (value) => {
  if (value === undefined) return '';
  if (isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return String(value);
};

function formatItem(prefix, item) {
  const lines = [];
  const path = prefix ? `${prefix}.${item.key}` : item.key;

  if (item.children) {
    item.children.forEach((child) => {
      lines.push(...formatItem(path, child));
    });
    return lines;
  }

  if (item.status === 'added') {
    lines.push(`Property '${path}' was added with value: ${formatValue(item.value)}`);
  } else if (item.status === 'removed') {
    lines.push(`Property '${path}' was removed`);
  } else if (item.status === 'updated') {
    lines.push(`Property '${path}' was updated. From ${formatValue(item.oldValue)} to ${formatValue(item.value)}`);
  }

  return lines;
}

const formatPlain = (diff) => {
  const lines = [];
  diff.forEach((item) => {
    lines.push(...formatItem('', item));
  });
  return lines.join('\n');
};

export default formatPlain;
