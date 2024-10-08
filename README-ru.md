![Арт](https://i.postimg.cc/VkzY0nM6/art.png)

![GitHub Created At](https://img.shields.io/github/created-at/id-andyyy/Image-Editing-Tool?style=flat&color=%23AA3FF6)
![Lines Of Code](https://tokei.rs/b1/github/id-andyyy/Image-Editing-Tool?style=flat&category=code&color=%23EC664A)
![Top Language](https://img.shields.io/github/languages/top/id-andyyy/Image-Editing-Tool?style=flat)
![Website](https://img.shields.io/website?url=https%3A%2F%2Fid-andyyy.github.io%2FImage-Editing-Tool%2F&style=flat)

# Image Editing Tool&nbsp;&#127912;

Сайт с возможностью редактировать и затем скачивать свои изображения&nbsp;&#127756;.

## Описание

Пользователь загружает свою картинку или использует изображение по умолчанию. Далее он может изменять следующие свойства:

- Фильтры:
  - Насыщенность
  - Яркость
  - Контраст
  - Оттенок
  - Размытие
  - Сепия
  - Инверсия цветов
- Ориентация:
  - Отражение по вертикали
  - Отражение по горизонтали
- Граница:
  - Толщина обводки
  - Цвет обводки
  - Закругление углов

Каждое свойство настраивается с помощью ползунков, чекбоксов или области выбора цвета. Рядом с каждым ползунком располагается кнопка сброса, которая устанавливает значение свойства по умолчанию&nbsp;&#128260;.

В конце пользователь может скачать полученное изображение в формате&nbsp;`png`.

## Демонстрация

Посетите [сайт](https://id-andyyy.github.io/Image-Editing-Tool/) или посмотрите демонстрацию (клик на картинку)&nbsp;&#128071;

[![Превью](https://i.postimg.cc/yx6PSfVj/preview.png)](https://youtu.be/wU4k40RQtR0)

## Технологии и инструменты

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=white&color=yellow)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white&color=ad63f7)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white&color=f14e32)

Особенности разработки:

- Используется особый прием для вычисления адаптивных величин ([смотреть код](https://gist.github.com/id-andyyy/92bffcaa37c60c395324fe26b1a518d6))
- Адаптивная вёрстка подстраивается под любое устройство
- Все элементы ввода (ползунки, чекбоксы, выбор цвета) выглядят одинаково в разных браузерах
- Прописана обработка ошибок при загрузке изображения пользователем
- Анимации при наведении на различные элементы
- Фоновые декоративные элементы
- БЭМ методология
- Чистый JavaScript (код разбит на функции)
- Настроены мета-теги

## Реализация функционала

При изменении ползунков картинке добавляются соответствующие CSS свойства. При скачивании картинка вместе со всеми свойствами перерисовывается на&nbsp;`canvas`. После этого содержимое&nbsp;`canvas` преобразовывается в изображение&nbsp;`png` и готовится к скачиванию.

Подробнее в файле [index.js](js/index.js).

## Обратная связь

Буду признателен, если вы поставите звезду&nbsp;&#11088;. Если вы нашли баг или у вас есть предложения по улучшению, используйте раздел [Issues](https://github.com/id-andyyy/Image-Editing-Tool/issues).

## Благодарности

Благодарность за идею дизайна сайта [strawberry2892&nbsp;&#127827;](https://github.com/strawberry2892).

Читать на [английском&nbsp;&#127468;&#127463;](README.md)