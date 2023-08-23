// Import path if we need to resolve relative paths.
const path = require('path')
const os = require('os')

// Let's add that background image.
exports.decorateConfig = config => {
  if (!config.backgroundImage) return
  // Check if the background path is absolute.
  var backgroundImage = config.backgroundImage;
  var opacity = 0;
  var backgroundColor = "black";
  if (Array.isArray(config.backgroundImage)) {
    backgroundImage = config.backgroundImage[
		Math.floor(Math.random() * config.backgroundImage.length)]; 
	if (typeof(backgroundImage) === "object") {
		// The opacity is given to the black background so it's the reverse
		backgroundColor =  backgroundImage.backgroundColor ? backgroundImage.backgroundColor : backgroundColor;
		opacity = backgroundImage.opacity ? 1 - backgroundImage.opacity : opacity;
		backgroundImage = backgroundImage.url;
	}
  }
console.log(backgroundImage);
  const backgroundPath = path.isAbsolute(backgroundImage)
    // If it is absolute, then set it to the value, else resolve it correctly.
    ? backgroundImage
    : path.resolve(os.homedir(), backgroundImage)
  // Assign the old config and our customizations to a new object and return it.

  return Object.assign(config, {
    // This makes the terminal transparent.
    backgroundColor: 'transparent',
    // Add our custom background CSS. Don't reassign CSS to avoid replacing any existing CSS.
    css: `
      ${config.css || ''}
      .hyper_main {
        background: url(file://${backgroundPath}) center;
        background-size: cover;

      }
	  .hyper_main::before {
		  content: "";
		  position: absolute;
		  top: 0;
		  left: 0;
		  right: 0;
		  bottom: 0;
		  background-color: ${backgroundColor};
		  opacity: ${opacity};
		}
      .terms_terms {
        background-color: transparent;
      }
    `
  })
}
