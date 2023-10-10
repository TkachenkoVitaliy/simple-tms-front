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
    // indent: ['error', 2],
    semi: ['error', 'never'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'warn',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'off',
    'max-lines': [
      'warn',
      { max: 100, skipBlankLines: false, skipComments: true },
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
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'warn',
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
