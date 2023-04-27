module.exports = {
  parser: '@babel/eslint-parser', // Настройки для babel
  parserOptions: { // Настройки для babel
    babelOptions: {
      configFile: './babel.config.json',
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['eslint:recommended', 'google'],
  rules: {
    'semi': 'off',
    'comma-dangle': 'off',
    'max-len': ['error', {code: 200}],
    'require-jsdoc': 'off'
  }
}

