module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'airbnb-base',
  globals: {
    __static: true
  },
  plugins: [
    'html'
  ],
  'rules': {
    'global-require': 0,
    'import/no-unresolved': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    'import/extensions': 0,
    'import/newline-after-import': 0,
    'no-multi-assign': 0,
    "no-new": 0,
    "semi": 0,
    "eol-last": 0,
    "comma-dangle": 0,
    "prefer-const": 0,
    "import/no-dynamic-require": 0,
    "import/no-extraneous-dependencies": 0,
    "arrow-parens": 0,
    "no-underscore-dangle": 0,
    "no-mixed-operators": 0,
    "class-methods-use-this": 0,
    "arrow-body-style": 0,
    "no-restricted-syntax": 0,
    "object-curly-spacing": 0,
    "no-trailing-spaces": 0,
    "no-empty": 0,
    "max-len": [
      "error",
      { "code": 120 }
    ],

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
