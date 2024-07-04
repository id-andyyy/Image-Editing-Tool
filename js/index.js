document.querySelector('#upload').addEventListener('input', handleFileSelect);

const imageNode = document.querySelector('#image');
const canvasImage = new Image();
const colorToolsNode = document.querySelectorAll('#color .group__input'),
  orientationToolsNode = document.querySelectorAll('#orientation .group__input'),
  borderToolsNode = document.querySelectorAll('#border .group__input'),
  radiusToolsNode = document.querySelectorAll('#radius .group__input');

initializeToolListeners(colorToolsNode, 'filter');
initializeToolListeners(orientationToolsNode, 'transform');
initializeToolListeners(borderToolsNode, 'border');
initializeToolListeners(radiusToolsNode, 'border-radius');

document.querySelector('#download').addEventListener('click', downloadImage);

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    readFile(file);
  }
}

function readFile(file) {
  const imageUrl = URL.createObjectURL(file);
  canvasImage.src = imageNode.src = imageUrl;
  imageNode.onerror = function () {
    canvasImage.src = imageNode.src = 'assets/demo.png';
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
  const canvasNode = document.createElement('canvas');
  const ctx = canvasNode.getContext('2d');
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
  console.log(canvasImage.width, canvasImage.height, imageNode.width, imageNode.height);
  ctx.drawImage(canvasImage, borderSizeValue, borderSizeValue);

  drawRoundRect(ctx, '#ffffff', borderSizeValue, imageWidthValue, imageHeightValue, borderRadiusValue / 1.25, 'destination-over', 'destination-over');
  if (borderSizeValue) {
    drawRoundRect(ctx, borderColorValue, 0, canvasNode.width, canvasNode.height, borderRadiusValue, 'destination-over');
  }

  const canvasUrl = canvasNode.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = canvasUrl;
  link.download = 'edited-image.png';

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(canvasNode);
  document.body.removeChild(link);
}

function drawRoundRect(ctx, colorValue, borderSizeValue, imageWidthValue, imageHeightValue, borderRadiusValue, operationTypeBefore = 'source-over', operationTypeAfter = 'source-over') {
  ctx.globalCompositeOperation = operationTypeBefore;
  ctx.fillStyle = colorValue;
  ctx.roundRect(borderSizeValue, borderSizeValue, imageWidthValue, imageHeightValue, borderRadiusValue);
  ctx.fill();
  ctx.globalCompositeOperation = operationTypeAfter;
}