import lodash from 'lodash';

const { sortBy } = lodash;

const DIFF_MARKS = {
  REMOVED: '-',
  ADDED: '+',
  UNCHANGED: ' ',
};

const formatValue = (value) => {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return JSON.stringify(value);
};

const genDiff = (data1, data2) => {
  const keys = Array.from(new Set([...Object.keys(data1), ...Object.keys(data2)]));
  const sortedKeys = sortBy(keys, (key) => key);

  const lines = sortedKeys
    .map((key) => {
      const inFirst = Object.prototype.hasOwnProperty.call(data1, key);
      const inSecond = Object.prototype.hasOwnProperty.call(data2, key);
      if (inFirst && inSecond && data1[key] === data2[key]) {
        return `  ${DIFF_MARKS.UNCHANGED} ${key}: ${formatValue(data1[key])}`;
      }
      if (inFirst && !inSecond) return `  ${DIFF_MARKS.REMOVED} ${key}: ${formatValue(data1[key])}`;
      if (!inFirst && inSecond) return `  ${DIFF_MARKS.ADDED} ${key}: ${formatValue(data2[key])}`;
      return [
        `  ${DIFF_MARKS.REMOVED} ${key}: ${formatValue(data1[key])}`,
        `  ${DIFF_MARKS.ADDED} ${key}: ${formatValue(data2[key])}`,
      ].join('\n');
    });

  return ['{', ...lines, '}'].join('\n');
};

export default genDiff;
