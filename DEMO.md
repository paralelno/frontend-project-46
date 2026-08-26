# Демонстрация работы gendiff (локальная запись, 26.08.26)

Записана через PTY (эквивалент asciinema). Вывод команды:

## Вложенные структуры (stylish)

```console
$ gendiff fixtures/nested/file1.json fixtures/nested/file2.json

{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}
```

## JSON

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

## YAML

```console
$ gendiff file1.yml file2.yml

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
