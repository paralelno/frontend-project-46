import fs from 'fs';
import path from 'path';
import { parse as parseYaml } from 'yaml';

const readFileSync = (filePath) => fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf-8');

const parse = (filePath) => {
  const ext = path.extname(filePath).slice(1).toLowerCase();
  const content = readFileSync(filePath);
  if (ext === 'json') return JSON.parse(content);
  if (ext === 'yaml' || ext === 'yml') return parseYaml(content);
  throw new Error(`Unsupported file format: ${ext}`);
};

export default parse;
