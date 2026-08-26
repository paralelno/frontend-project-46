# Демонстрация работы gendiff (локальная запись, 26.08.26)

Записана через PTY (эквивалент asciinema). Вывод команды:

```console
$ gendiff file1.json file2.json

{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```

## Расшифровка

| Ключ | file1.json | file2.json | Метка |
|------|------------|------------|-------|
| follow | false | — | `-` (только в file1) |
| host | hexlet.io | hexlet.io | ` ` (без изменений) |
| proxy | 123.234.53.22 | — | `-` (только в file1) |
| timeout | 50 | 20 | `-`/`+` (обновлено) |
| verbose | — | true | `+` (только в file2) |

## Справка

```console
$ gendiff -h

Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Arguments:
  filepath1            path to the first file
  filepath2            path to the second file

Options:
  -V, --version        output the version number
  -f, --format [type]  output format
  -h, --help           display help for command
```
