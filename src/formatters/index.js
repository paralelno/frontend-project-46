import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const DEFAULT_FORMATTER = formatStylish;

const formatters = {
  plain: formatPlain,
  stylish: formatStylish,
};

const getFormatter = (name) => formatters[name] || DEFAULT_FORMATTER;

export { formatters, DEFAULT_FORMATTER };
export default getFormatter;
