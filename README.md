# tailwindcss-colorize

A plugin for [Tailwind CSS](https://www.tailwindcss.com/) to colorize arbitrary
elements using CSS filters. The most popular use case is to colorize single-color
icons without altering the icon file directly.

See [this CodePen](https://codepen.io/sosuke/pen/Pjoqqp) for demo of the underlying method.

## Requirements

This plugin requires **Tailwind CSS v1.x**.

## Installation

```shell
npm install --save-dev tailwindcss-colorize
```

or

```shell
yarn add --dev tailwindcss-colorize
```

## Usage

In your _tailwind.config.js_:

```js
module.exports = {
  // …
  theme: {
    colorize: [
      // use any color defined in your theme, the following are taken from the default theme
      'gray-500',
      'teal-500',
    ]
  }
  plugins: [
    // …
    require("tailwindcss-colorize")
    // …
  ]
  // …
};
```

This would generate the following utility class:

```css
.colorize-gray-500 {
  -webkit-filter: invert(72%) sepia(39%) saturate(135%) hue-rotate(174deg) brightness(90%) contrast(86%);
  filter: invert(72%) sepia(39%) saturate(135%) hue-rotate(174deg) brightness(90%) contrast(86%);
}

.colorize-teal-500 {
  -webkit-filter: invert(77%) sepia(6%) saturate(4378%) hue-rotate(132deg) brightness(81%) contrast(78%);
  filter: invert(77%) sepia(6%) saturate(4378%) hue-rotate(132deg) brightness(81%) contrast(78%);
}

.blacken {
  -webkit-filter: brightness(0) saturate(100%);
  filter: brightness(0) saturate(100%);
}
```

And in your HTML you could use these classes like this:

```html
<img src="/images/icon.png" class="colorize-teal-500">
```

For this to work, the icon color needs to be black. If it is not, you can use 
the `.blacken` utility class that is also generated like this:

```html
<span class="colorize-teal-500">
  <img src="/images/icon.png" class="blacken">
</span>
```


## License

[MIT](https://philippbosch.mit-license.org/)
