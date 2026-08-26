import parse from './parser.js';
import genDiff from './diff.js';
import formatStylish from './stylish.js';

const genDiffFiles = (filepath1, filepath2) => {
  const diff = genDiff(parse(filepath1), parse(filepath2));
  return formatStylish(diff);
};

export default genDiffFiles;
