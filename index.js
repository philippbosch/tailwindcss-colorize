const {
  Color,
  Solver,
  hexToRgb
} = require('./utils');

module.exports = function colorize({
  addUtilities,
  config,
  e
}) {
  const colorNames = config('theme.colorize', []);
  const variants = config('variants.colorize', []);
  const utilities = {};

  colorNames.forEach(colorName => {
    const dashIndex = colorName.lastIndexOf('-');
    const baseColor = colorName.substr(0, dashIndex);
    const weight = colorName.substr(dashIndex + 1);
    const hexColor = config(`theme.colors.${baseColor}[${weight}]`);
    const rgbValues = hexToRgb(hexColor);
    const color = new Color(...rgbValues);
    const solver = new Solver(color);
    const result = solver.solve();

    utilities[`.colorize-${e(colorName)}`] = {
      'filter': result.filter.split(': ')[1],
    };

    utilities[`.blacken`] = {
      'filter': 'brightness(0) saturate(100%)'
    };
  });

  addUtilities(utilities, {
    variants,
  });
};
