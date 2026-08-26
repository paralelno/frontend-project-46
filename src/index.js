import parse from './parser.js';
import genDiff from './diff.js';
import getFormatter, { DEFAULT_FORMATTER } from './formatters/index.js';

const genDiffFiles = (filepath1, filepath2, formatName = 'stylish') => {
  const diff = genDiff(parse(filepath1), parse(filepath2));
  const formatter = getFormatter(formatName) || DEFAULT_FORMATTER;
  return formatter(diff);
};

export default genDiffFiles;
