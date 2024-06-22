const upload = document.querySelector('#upload');
const image = document.querySelector('#image');
const colorTools = document.querySelectorAll('#color .tools__input'),
  orientationTools = document.querySelectorAll('#orientation .tools__input'),
  borderTools = document.querySelectorAll('#border .tools__input'),
  radiusTools = document.querySelectorAll('#radius .tools__input');

upload.addEventListener('input', handleFileSelect);

initializeToolListeners(colorTools, 'filter');
initializeToolListeners(orientationTools, 'transform');
initializeToolListeners(borderTools, 'border');
initializeToolListeners(radiusTools, 'border-radius');

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
    'hue-rotate': `hue-rotate(${propertyValue}deg)`,
    'blur': `blur(${propertyValue}px)`,
    'invert': `invert(${node.checked ? 1 : 0})`,
    'scaleX': `scaleX(${node.checked ? -1 : 1})`,
    'scaleY': `scaleY(${node.checked ? -1 : 1})`,
    'border-width': `${propertyValue}px`,
    'border-style': propertyValue,
    'border-color': propertyValue,
    'border-radius': `${propertyValue}%`,
  };

  return propertyMap[propertyName] || `${propertyName}(${propertyValue}%)`;
}