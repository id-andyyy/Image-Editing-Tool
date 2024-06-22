document.querySelector('#upload').addEventListener('input', handleFileSelect);

const image = document.querySelector('#image');
const colorTools = document.querySelectorAll('#color .tools__input'),
  orientationTools = document.querySelectorAll('#orientation .tools__input'),
  borderTools = document.querySelectorAll('#border .tools__input'),
  radiusTools = document.querySelectorAll('#radius .tools__input');

initializeToolListeners(colorTools, 'filter');
initializeToolListeners(orientationTools, 'transform');
initializeToolListeners(borderTools, 'border');
initializeToolListeners(radiusTools, 'border-radius');

document.querySelector('#download').addEventListener('click', downloadImage);

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    readFile(file, setImageSrc);
  }
}

function readFile(file, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(file);
}

function setImageSrc(dataURL) {
  image.src = dataURL;
}

function initializeToolListeners(toolsGroup, styleProperty) {
  toolsGroup.forEach((tool) => tool.addEventListener('input', updateImageStyle.bind(this, toolsGroup, styleProperty)));
  updateImageStyle.call(this, toolsGroup, styleProperty);
}

function updateImageStyle(toolsGroup, propertyName) {
  image.style[propertyName] = getAssembledProperty.call(this, toolsGroup);
}

function getAssembledProperty(toolsGroup) {
  return Array.from(toolsGroup).map(getProperty).join(' ');
}

function getProperty(node) {
  const propertyName = node.name,
    propertyValue = node.value;
  const propertyMap = {
    'saturate': `saturate(${propertyValue}%)`,
    'brightness': `brightness(${propertyValue}%)`,
    'contrast': `contrast(${propertyValue}%)`,
    'hue-rotate': `hue-rotate(${propertyValue}deg)`,
    'blur': `blur(${propertyValue}px)`,
    'invert': `invert(${node.checked ? 1 : 0})`,
    'sepia': `sepia(${node.checked ? 1 : 0})`,
    'scaleX': `scaleX(${node.checked ? -1 : 1})`,
    'scaleY': `scaleY(${node.checked ? -1 : 1})`,
    'border-width': `${propertyValue}px`,
    'border-style': 'solid',
    'border-color': propertyValue,
    'border-radius': `${propertyValue}px`,
  };

  return propertyMap[propertyName];
}

function downloadImage() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const imageWidthValue = image.width,
    imageHeightValue = image.height,
    filterValue = image.style.filter,
    transformValue = image.style.transform,
    borderSizeValue = parseInt(image.style.borderWidth),
    borderColorValue = image.style.borderColor,
    borderRadiusValue = parseInt(image.style.borderRadius);

  canvas.width = imageWidthValue + borderSizeValue * 2;
  canvas.height = imageHeightValue + borderSizeValue * 2;

  document.body.appendChild(canvas);

  ctx.filter = filterValue;

  drawRoundRect(ctx, '#ffffff', borderSizeValue, imageWidthValue, imageHeightValue, borderRadiusValue / 1.25, 'source-over', 'source-in')

  const scaleX = transformValue.match(/scaleX\((.+?)\)/)[1],
    scaleY = transformValue.match(/scaleY\((.+?)\)/)[1];
  ctx.translate(scaleX == 1 ? 0 : canvas.width, scaleY == 1 ? 0 : canvas.height);
  ctx.scale(scaleX, scaleY);
  ctx.drawImage(image, borderSizeValue, borderSizeValue);


  drawRoundRect(ctx, '#ffffff', borderSizeValue, imageWidthValue, imageHeightValue, borderRadiusValue / 1.25, 'destination-over', 'destination-over');
  if (borderSizeValue) {
    drawRoundRect(ctx, borderColorValue, 0, canvas.width, canvas.height, borderRadiusValue, 'destination-over');
  }

  const canvasUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = canvasUrl;
  link.download = 'edited-image.png';

  document.body.appendChild(link);
  link.click();

  // document.body.removeChild(canvas);
  // document.body.removeChild(link);
}

function drawRoundRect(ctx, colorValue, borderSizeValue, imageWidthValue, imageHeightValue, borderRadiusValue, operationTypeBefore = 'source-over', operationTypeAfter = 'source-over') {
  ctx.globalCompositeOperation = operationTypeBefore;
  ctx.fillStyle = colorValue;
  ctx.roundRect(borderSizeValue, borderSizeValue, imageWidthValue, imageHeightValue, borderRadiusValue);
  ctx.fill();
  ctx.globalCompositeOperation = operationTypeAfter;
}