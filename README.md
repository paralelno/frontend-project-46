# Вычислитель отличий (JS)

[![hexlet-check](https://github.com/paralelno/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/paralelno/frontend-project-46/actions)

Узнаете, как создавать cli приложения, парсить и форматировать данные в json, yaml. Научитесь проектировать архитектуру приложений. А также писать unit-тесты.

Учебный проект Хекслета: https://ru.hexlet.io/programs/frontend
Как это должно работать: https://asciinema.org/a/Pe6QypnLEmFWssNAjCOJN1iii

## Стек

- JavaScript

## Установка

```bash
git clone https://github.com/paralelno/frontend-project-46.git
cd frontend-project-46
make install
```

## Использование

```bash
gendiff file1.json file2.json                 # stylish (по умолчанию)
gendiff file1.yml file2.yml -f plain          # текстовый формат
gendiff file1.json file2.json -f json         # структурированный JSON
node gendiff.js -h                            # справка
```

Вложенные структуры:

```bash
gendiff fixtures/nested/file1.json fixtures/nested/file2.json
```

Демонстрация (запись терминала с примером работы, включая справку, плоский и вложенный диф): [DEMO.md](DEMO.md)

## Тесты

```bash
make test          # vitest run
make lint          # eslint .
```

---

<details>
<summary>Автоматические тесты Хекслета</summary>

Тесты запускаются на каждый коммит. За запуск отвечает файл `.github/workflows/hexlet-check.yml` — не удаляйте и не переименовывайте ни его, ни репозиторий.

</details>

## О Хекслете

[Хекслет](https://ru.hexlet.io/) — школа программирования: авторские программы обучения с практикой, поддержкой наставников и реальными проектами, которые остаются в резюме. Этот репозиторий — один из таких проектов.
