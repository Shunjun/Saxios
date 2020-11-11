const OFF = 0;
const WARNING = 1
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': [
      ERROR,
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        json: 'never',
        js: 'never',
      },
    ],
    'import/no-extraneous-dependencies': OFF,
    'import/no-unresolved': OFF,

    'func-names': OFF,
    'lines-between-class-members': OFF,
    'max-classes-per-file': OFF,
    'no-console': WARNING,
    'no-empty': OFF,
    'no-param-reassign': OFF,
    'no-plusplus': OFF,
    'no-underscore-dangle': OFF,
    'no-unused-expressions': OFF,
    'no-use-before-define': OFF,
    'no-useless-constructor': OFF,
    'no-undef': OFF,
    'no-dupe-class-members': OFF,
    'no-unused-vars': OFF,
    'no-redeclare': OFF
  },
  settings: {
    'import/resolver': {
      node: {
        // 指定 eslint-plugin-import 解析的后缀名
        extensions: ['.ts', '.tsx', '.js', '.json'],
      },
    },
  },
  overrides: [
    {
      files: ['**/*.d.ts'],
      rules: {
        'import/no-duplicates': OFF,
        'no-unused-vars': OFF
      },
    },]
};

