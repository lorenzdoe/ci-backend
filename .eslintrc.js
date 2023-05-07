// .eslintrc.js
module.exports = {
    root: true,
    env: {
      node: true,
      jest: true
    },
    extends: ['plugin:vue/recommended', 'eslint:recommended'],
    rules: {
        'no-console': 'warn',
        'no-unused-vars': 'warn',
        'semi': ['error', 'always'],
        'quotes': ['error', 'single'],
    },
};