import lodash from 'lodash';

const { sortBy } = lodash;

export const STATUS = {
  SAME: 'same',
  ADDED: 'added',
  REMOVED: 'removed',
  UPDATED: 'updated',
};

export const isObject = (value) => value !== null
  && typeof value === 'object'
  && !Array.isArray(value);

const genDiffItem = (oldValueForKey, newValueForKey, key) => {
  if (isObject(oldValueForKey) && isObject(newValueForKey)) {
    return {
      status: STATUS.SAME,
      key,
      // eslint-disable-next-line no-use-before-define
      children: genDiff(oldValueForKey, newValueForKey),
    };
  }
  if (oldValueForKey === undefined) {
    return { status: STATUS.ADDED, key, value: newValueForKey };
  }
  if (newValueForKey === undefined) {
    return { status: STATUS.REMOVED, key, value: oldValueForKey };
  }
  if (oldValueForKey !== newValueForKey) {
    return {
      status: STATUS.UPDATED,
      key,
      value: newValueForKey,
      oldValue: oldValueForKey,
    };
  }
  return { status: STATUS.SAME, key, value: oldValueForKey };
};

function genDiff(oldValue, newValue) {
  const keys = sortBy([...new Set([...Object.keys(oldValue), ...Object.keys(newValue)])]);
  return keys.map((key) => genDiffItem(oldValue[key], newValue[key], key));
}

export default genDiff;
