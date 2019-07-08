const fs = require('fs');
const path = require('path');
const envPaths = require('env-paths');

const {
  Color,
  Solver,
  hexToRgb
} = require('./utils');

const cacheDir = envPaths('tailwindcss-colorize').cache;
const cacheFilePath = path.join(cacheDir, 'cache.json');

if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir);
}

function readCache() {
  try {
    const jsonData = fs.readFileSync(cacheFilePath, 'utf8');
    const data = JSON.parse(jsonData);
    return data;
  } catch (e) {
    fs.writeFileSync(cacheFilePath, JSON.stringify({}), 'utf8');
    return {};
  }
}

function writeCache(data) {
  fs.writeFileSync(cacheFilePath, JSON.stringify(data), 'utf8');
}


module.exports = function colorize({
  addUtilities,
  config,
  e
}) {
  const colorNames = config('theme.colorize', []);
  const variants = config('variants.colorize', []);
  const utilities = {};

  const cache = readCache();

  colorNames.forEach(colorName => {
    const dashIndex = colorName.lastIndexOf('-');
    const baseColor = colorName.substr(0, dashIndex);
    const weight = colorName.substr(dashIndex + 1);
    const hexColor = config(`theme.colors.${baseColor}[${weight}]`);
    let result;
    if (hexColor in cache) {
      result = cache[hexColor];
    } else {
      const rgbValues = hexToRgb(hexColor);
      const color = new Color(...rgbValues);
      const solver = new Solver(color);
      result = solver.solve();
      cache[hexColor] = result;
      writeCache(cache);
    }

    utilities[`.colorize-${e(colorName)}`] = {
      'filter': result.filter.split(': ')[1].replace(/;$/, ''),
    };

    utilities[`.blacken`] = {
      'filter': 'brightness(0) saturate(100%)'
    };
  });

  addUtilities(utilities, {
    variants,
  });
};
