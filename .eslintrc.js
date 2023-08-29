module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
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
    indent: ['error', 2],
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_|args' }],
    'react/require-default-props': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react/function-component-definition': 'off',
    'no-shadow': 'warn',
    'import/extensions': ['warn', { ts: 'never', tsx: 'never', js: 'never' }],
    'import/no-extraneous-dependencies': ['warn', { devDependencies: true }],
    'no-underscore-dangle': 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    'max-lines': [
      'warn',
      { max: 100, skipBlankLines: false, skipComments: true },
    ],
  },
  globals: {
    __IS_DEV__: true,
  },
}
