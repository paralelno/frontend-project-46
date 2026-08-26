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


## Plain (текстовый формат)

```console
$ gendiff --format plain fixtures/nested/file1.json fixtures/nested/file2.json

Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```


## JSON (структурированный вывод)

```console
$ gendiff --format json fixtures/nested/file1.json fixtures/nested/file2.json

[
  {
    "status": "same",
    "key": "common",
    "children": [
      {
        "status": "added",
        "key": "follow",
        "value": false
      },
      {
        "status": "same",
        "key": "setting1",
        "value": "Value 1"
      },
      {
        "status": "removed",
        "key": "setting2",
        "value": 200
      },
      {
        "status": "updated",
        "key": "setting3",
        "value": null,
        "oldValue": true
      },
      {
        "status": "added",
        "key": "setting4",
        "value": "blah blah"
      },
      {
        "status": "added",
        "key": "setting5",
        "value": {
          "key5": "value5"
        }
      },
      {
        "status": "same",
        "key": "setting6",
        "children": [
          {
            "status": "same",
            "key": "doge",
            "children": [
              {
                "status": "updated",
                "key": "wow",
                "value": "so much",
                "oldValue": ""
              }
            ]
          },
          {
            "status": "same",
            "key": "key",
            "value": "value"
          },
          {
            "status": "added",
            "key": "ops",
            "value": "vops"
          }
        ]
      }
    ]
  },
  {
    "status": "same",
    "key": "group1",
    "children": [
      {
        "status": "updated",
        "key": "baz",
        "value": "bars",
        "oldValue": "bas"
      },
      {
        "status": "same",
        "key": "foo",
        "value": "bar"
      },
      {
        "status": "updated",
        "key": "nest",
        "value": "str",
        "oldValue": {
          "key": "value"
        }
      }
    ]
  },
  {
    "status": "removed",
    "key": "group2",
    "value": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  },
  {
    "status": "added",
    "key": "group3",
    "value": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  }
]
```
