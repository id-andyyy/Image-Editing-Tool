const upload = document.querySelector('#upload');
const image = document.querySelector('#image');
const colorTools = document.querySelectorAll('#color .tools__input'),
  orientationTools = document.querySelectorAll('#orientation .tools__input'),
  borderTools = document.querySelectorAll('#border .tools__input'),
  radiusTools = document.querySelectorAll('#radius .tools__input');

upload.addEventListener('input', handleFileSelect);

colorTools.forEach((tool) => tool.addEventListener('input', setImageStyle.bind(this, colorTools, 'filter')));
orientationTools.forEach((tool) => tool.addEventListener('input', setImageStyle.bind(this, orientationTools, 'transform')));
borderTools.forEach((tool) => tool.addEventListener('input', setImageStyle.bind(this, borderTools, 'border')));
radiusTools.forEach((tool) => tool.addEventListener('input', setImageStyle.bind(this, radiusTools, 'border-radius')));


function handleFileSelect(event) {
  let file = event.target.files[0];
  if (file) {
    readFile(file, setImageSrc);
  }
}

function readFile(file, callback) {
  let reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(file);
}

function setImageSrc(dataURL) {
  image.src = dataURL;
}

function setImageStyle(toolsGroup, propertyName) {
  image.style[propertyName] = getAssembledProperty.call(this, toolsGroup);
}

function getAssembledProperty(toolGroup) {
  let properties = [];
  for (let node of toolGroup) {
    properties.push(getProperty.call(this, node));
  }
  return properties.join(' ');
}

function getProperty(node) {
  let propertyName = node.name,
    propertyValue = node.value;
  switch (propertyName) {
    case 'hue-rotate':
      return `${propertyName}(${propertyValue}deg)`;
    case 'blur':
      return `${propertyName}(${propertyValue}px)`;
    case 'invert':
      switch (node.checked) {
        case true:
          return `${propertyName}(1)`;
        default:
          return `${propertyName}(0)`;
      };
    case 'scaleX':
    case 'scaleY':
      switch (node.checked) {
        case true:
          return `${propertyName}(-1)`;
        default:
          return `${propertyName}(1)`;
      };
    case 'border-width':
      return `${propertyValue}px`;
    case 'border-style':
    case 'border-color':
      return `${propertyValue}`;
    case 'border-radius':
      return `${propertyValue}%`;
    default:
      return `${propertyName}(${propertyValue}%)`;
  }
}