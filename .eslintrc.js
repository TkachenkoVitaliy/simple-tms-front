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
    indent: ['error', 2],
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'no-shadow': 'warn',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'off',
    'max-lines': [
      'warn',
      { max: 100, skipBlankLines: false, skipComments: true },
    ],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'warn',
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
  },
}
