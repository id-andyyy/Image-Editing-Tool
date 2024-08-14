![Art](https://i.postimg.cc/VkzY0nM6/art.png)
# Image Editing Tool&nbsp;&#127912;

A website with the ability to edit and then download your images&nbsp;&#127756;.

## Description

The user uploads their own image or uses the default image. Then it can change the following properties:

- Filters:
- Saturation
  - Brightness
  - Contrast
  - Shade
- Blur
  - Sepia
  - Inversion of colors
- Orientation:
  - Vertical reflection
  - Horizontal reflection
- Border:
- Stroke thickness
  - Outline color
  - Rounding the corners

Each property is configured using sliders, checkboxes, or a color selection area. There is a reset button next to each slider, which sets the default value of the property&nbsp;&#128260;.

At the end, the user can download the resulting image in the&nbsp;`png`&nbsp;format.

## Demonstration

Visit [website](https://id-andyyy.github.io/Image-Editing-Tool/) or watch the demo (click on the image)&nbsp;&#128071;

[![Preview](https://i.postimg.cc/yx6PSfVj/preview.png)](https://youtu.be/wU4k40RQtR0)

## Technologies and tools

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=white&color=yellow)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white&color=ad63f7)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white&color=f14e32)

Development features:

- A special technique is used to calculate adaptive quantities ([see code](https://gist.github.com/id-andyyy/92bffcaa37c60c395324fe26b1a518d6))
- Adaptive layout adapts to any device
- All input elements (sliders, checkboxes, color selection) look the same in different browsers
- Error handling is prescribed when uploading an image by the user
- Animations when hovering over various elements
- Background decorative elements
- BEM methodology
- Pure JavaScript (the code is broken down into functions)
- Meta tags are configured

## Implementation of the functionality

When you change the sliders, the corresponding CSS properties are added to the image. When downloading, the image, along with all the properties, is redrawn on the&nbsp;`canvas`. After that, the contents of the&nbsp;`canvas` are converted to a&nbsp;`png` image and prepared for download.

Read more in the file [index.js](js/index.js).

## Feedback

I would appreciate it if you put a star&nbsp;&#11088;. If you find a bug or have suggestions for improvement, use the [Issues](https://github.com/id-andyyy/Image-Editing-Tool/issues/) section.

## Thanks

Thanks for the idea of website design [strawberry2892&nbsp;&#127827;](https://github.com/strawberry2892).

Read in [Russian&nbsp;&#127479;&#127482;](README-ru.md)