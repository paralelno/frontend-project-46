import genDiff from './diff.js';
import parse from './parser.js';

const compareFiles = (filepath1, filepath2) => genDiff(parse(filepath1), parse(filepath2));

export default compareFiles;
