module.exports = {
    root: true,
    'extends': [
      'plugin:vue/essential',
      '@vue/airbnb'
    ],
    rules: {
      "linebreak-style": 0,
      "no-param-reassign": 0,
      "max-len": [2, 800, 4, {"ignoreUrls": true}]
    },
    parserOptions: {
      "parser": "babel-eslint",
    }
  }