/* eslint-disable max-lines */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'import/order': [
      'error',
      {
        warnOnUnassignedImports: true,
        groups: [
          // Встроенные в ноду модули, типо `fs` или `path`
          'builtin',
          // Внешние библиотеки из `package.json`
          'external',
          // Внутренние модули с путями, тут path-aliases
          'internal',
          // Из какой-то из родительских директорий
          'parent',
          // Из соседней директории
          'sibling',
          // Индексный файл из текущей директории (довольно редкий кейс)
          'index',
          'object',
          'type',
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'react-dom',
            group: 'builtin',
          },
          {
            pattern: 'mobx-react-lite',
            group: 'builtin',
          },
          {
            pattern: 'app/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'pages/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'widgets/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'features/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'entities/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'shared/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: [
          'react',
          'react-dom',
          'mobx-react-lite',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    semi: ['error', 'never'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'warn',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'off',
    'no-param-reassign': 'warn',
    'class-methods-use-this': 'warn',
    'max-lines': [
      'warn',
      { max: 120, skipBlankLines: true, skipComments: true },
    ],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/jsx-pascal-case': ['error', { allowNamespace: true }],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: ['function-declaration', 'arrow-function'],
      },
    ],
    'react/no-unstable-nested-components': [
      'warn',
      {
        allowAsProps: true,
      },
    ],
    'react/destructuring-assignment': [
      'error',
      'always',
      {
        ignoreClassFields: true,
      },
    ],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    'import/extensions': [
      'warn',
      { ts: 'never', tsx: 'never', js: 'never', svg: 'always', scss: 'always' },
    ],
    'import/no-extraneous-dependencies': ['warn', { devDependencies: true }],
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { vars: 'local', argsIgnorePattern: '^_|args' },
    ],
  },
  globals: {
    __IS_DEV__: true,
    theme: true,
  },
}
