### Hexlet tests and linter status:
[![Actions Status](https://github.com/BelarusWillBeFree/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/BelarusWillBeFree/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/41b1f076cc89afb108fc/maintainability)](https://codeclimate.com/github/BelarusWillBeFree/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/41b1f076cc89afb108fc/test_coverage)](https://codeclimate.com/github/BelarusWillBeFree/frontend-project-lvl2/test_coverage)
[![Action Status](https://github.com/BelarusWillBeFree/frontend-project-lvl2/actions/workflows/makeTests.yml/badge.svg)](https://github.com/BelarusWillBeFree/frontend-project-lvl2/actions)

В проекте реализована функция сравнения файлов и возврата отличий между файлами в разных видах. 
Установка проекта: make install,
Запуск eslink: make lint,
Запуск тестов: make test,
Запуск тестов с таблицей покрытия: make test-coverage
Получение справки: gendiff -h
Узнать номер версии gendiff -V
Запуск программы: gendiff [options] <путь к файлу 1> <путь к файлу 2>
Реализованные форматы вывода (задается в опции -f) : stilysh (default), plain, json
 
run gendiff
[![asciicast](https://asciinema.org/a/ujAaeK1jEqnM5zrsmkAHAFDoY.svg)](https://asciinema.org/a/ujAaeK1jEqnM5zrsmkAHAFDoY)
run gendiff step 5
[![asciicast](https://asciinema.org/a/ERCkzn6efDszQhU2gibd0Q9Zj.svg)](https://asciinema.org/a/ERCkzn6efDszQhU2gibd0Q9Zj)
run gendiff --format slylish
[![asciicast](https://asciinema.org/a/GPoLlH4lyeToZICH9hDKReKHo.svg)](https://asciinema.org/a/GPoLlH4lyeToZICH9hDKReKHo)
run gendiff --format plain
[![asciicast](https://asciinema.org/a/gQpBqUz5yn5C0bAig6luCod5v.svg)](https://asciinema.org/a/gQpBqUz5yn5C0bAig6luCod5v)
run gendiff --format json
[![asciicast](https://asciinema.org/a/WeyDqa5kN0ij1qi3wJpIXpwTF.svg)](https://asciinema.org/a/WeyDqa5kN0ij1qi3wJpIXpwTF)