document.querySelector('#upload').addEventListener('input', handleFileSelect);

const imageNode = document.querySelector('#image');
const colorToolsNode = document.querySelectorAll('#color .group__input'),
  orientationToolsNode = document.querySelectorAll('#orientation .group__input'),
  borderToolsNode = document.querySelectorAll('#border .group__input'),
  radiusToolsNode = document.querySelectorAll('#radius .group__input');

initializeToolListeners(colorToolsNode, 'filter');
initializeToolListeners(orientationToolsNode, 'transform');
initializeToolListeners(borderToolsNode, 'border');
initializeToolListeners(radiusToolsNode, 'border-radius');

document.querySelector('#download').addEventListener('click', downloadImage.bind(this, imageNode));

const resetNode = document.querySelectorAll('.group__reset');
resetNode.forEach((item) => item.addEventListener('click', resetProperty));

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    readFile(file);
  }
}

function readFile(file) {
  const imageUrl = URL.createObjectURL(file);
  imageNode.src = imageUrl;
  imageNode.onerror = function () {
    imageNode.src = 'assets/demo.png';
    showError('Картинка не поддерживается. Загрузите другую.');
  }
}

function showError(message) {
  alert(message);
}

function initializeToolListeners(toolsGroup, styleProperty) {
  toolsGroup.forEach((tool) => tool.addEventListener('input', updateImageStyle.bind(this, toolsGroup, styleProperty)));
  updateImageStyle.call(this, toolsGroup, styleProperty);
}

function updateImageStyle(toolsGroup, propertyName) {
  imageNode.style[propertyName] = getAssembledProperty.call(this, toolsGroup);
}

function getAssembledProperty(toolsGroup) {
  return Array.from(toolsGroup).map(getCSSProperty).join(' ');
}

function getCSSProperty(node) {
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

function downloadImage(imageNode) {
  const canvasNode = document.createElement('canvas');
  const ctx = canvasNode.getContext('2d');

  prepareCanvas(canvasNode, ctx, imageNode);

  const canvasUrl = canvasNode.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = canvasUrl;
  link.download = 'edited-image.png';

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(canvasNode);
  document.body.removeChild(link);
}

function prepareCanvas(canvasNode, ctx, imageNode) {
  const canvasImage = new Image();
  canvasImage.src = imageNode.src;

  const imageWidthValue = canvasImage.width,
    imageHeightValue = canvasImage.height,
    filterValue = imageNode.style.filter,
    transformValue = imageNode.style.transform,
    borderSizeValue = parseInt(imageNode.style.borderWidth),
    borderColorValue = imageNode.style.borderColor,
    borderRadiusValue = parseInt(imageNode.style.borderRadius);

  canvasNode.width = imageWidthValue + borderSizeValue * 2;
  canvasNode.height = imageHeightValue + borderSizeValue * 2;

  document.body.appendChild(canvasNode);

  drawRoundRect(ctx, '#ffffff', borderSizeValue, imageWidthValue, imageHeightValue, borderRadiusValue / 1.25, 'source-over', 'source-in')

  ctx.filter = filterValue;
  const scaleX = transformValue.match(/scaleX\((.+?)\)/)[1],
    scaleY = transformValue.match(/scaleY\((.+?)\)/)[1];
  ctx.translate(scaleX == 1 ? 0 : canvasNode.width, scaleY == 1 ? 0 : canvasNode.height);
  ctx.scale(scaleX, scaleY);

  ctx.drawImage(canvasImage, borderSizeValue, borderSizeValue);

  drawRoundRect(ctx, '#ffffff', borderSizeValue, imageWidthValue, imageHeightValue, borderRadiusValue / 1.25, 'destination-over', 'destination-over');
  if (borderSizeValue) {
    drawRoundRect(ctx, borderColorValue, 0, canvasNode.width, canvasNode.height, borderRadiusValue, 'destination-over');
  }
}

function drawRoundRect(ctx, colorValue, borderSizeValue, imageWidthValue, imageHeightValue, borderRadiusValue, operationTypeBefore = 'source-over', operationTypeAfter = 'source-over') {
  ctx.globalCompositeOperation = operationTypeBefore;
  ctx.fillStyle = colorValue;
  ctx.roundRect(borderSizeValue, borderSizeValue, imageWidthValue, imageHeightValue, borderRadiusValue);
  ctx.fill();
  ctx.globalCompositeOperation = operationTypeAfter;
}

function resetProperty(event) {
  const rangeNode = event.target.previousElementSibling;
  rangeNode.value = getDefaultValue(rangeNode.name);
  updateImageStyle(getToolsGroup(rangeNode), 'filter');
}

function getDefaultValue(rangeName) {
  const valueMap = {
    'saturate': '100',
    'brightness': '100',
    'contrast': '100',
    'hue-rotate': '0',
    'blur': '0',
    'border-width': '0',
    'border-radius': '0',
  }
  return valueMap[rangeName];
}

function getToolsGroup(rangeNode) {
  return rangeNode.parentElement.parentElement.querySelectorAll('.group__input');
}