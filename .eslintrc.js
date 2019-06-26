/** @format */

module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true
  },
  extends: ['eslint:recommended'],
  globals: {
    say: true,
    ask: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      jsx: true,
      classes: true,
      experimentalObjectRestSpread: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    curly: ['error', 'multi-or-nest', 'consistent'],
    'react/no-direct-mutation-state': 0,
    'react/display-name': 0,
    'react/prop-types': 0,
    'linebreak-style': ['error', 'unix'],
    'no-duplicate-imports': [
      'error',
      {
        includeExports: true
      }
    ],
    'rest-spread-spacing': ['error', 'never'],
    'jsx-quotes': ['error', 'prefer-double'],
    'prefer-spread': ['error'],
    'no-useless-call': ['error'],
    'no-trailing-spaces': ['error'],
    'space-before-blocks': ['error', 'always'],
    'no-unused-vars': ['error'],
    'no-floating-decimal': ['error'],
    'comma-dangle': ['error', 'never'],
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'switch-colon-spacing': [
      'error',
      {
        after: true,
        before: false
      }
    ],
    'space-unary-ops': [
      'error',
      {
        words: true,
        nonwords: false
      }
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'always',
        asyncArrow: 'always'
      }
    ],
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    'key-spacing': [
      'error',
      {
        singleLine: {
          beforeColon: false,
          afterColon: true,
          mode: 'strict'
        },
        multiLine: {
          beforeColon: false,
          afterColon: true,
          mode: 'strict'
        }
      }
    ],
    'generator-star-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'warn'
  }
};
