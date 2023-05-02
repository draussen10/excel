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
		'max-len': ['error', {code: 250}],
		'require-jsdoc': 'off',
		'linebreak-style': 'off',
		'indent': ['error', 'tab'],
		'no-tabs': ['error', {allowIndentationTabs: true}],
		'no-unused-vars': 'off',
		'arrow-parens': ['error', 'as-needed'],
		'operator-linebreak': 'off',
		'no-trailing-spaces': 'off'
	}
}

