const fs = require('fs')

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    ecmaVersion: 6,
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: [
    'react',
    'react-hooks',
    'jsx-a11y',
    'prettier',
    'simple-import-sort',
  ],
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:testing-library/recommended',
    'plugin:testing-library/react',
    'plugin:prettier/recommended',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  globals: {
    graphql: true,
  },
  rules: {
    curly: ['error', 'multi-line', 'consistent'],
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'always',
        singleQuote: true,
        trailingComma: 'all',
        semi: false,
      },
    ],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['ExternalLink'],
      },
    ],
    'no-console': 0,
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'no-underscore-dangle': 0,
    'object-curly-newline': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'react/no-danger': 0,
    'react/prefer-stateless-function': 0,
    'react/state-in-constructor': 0,
    'react/static-property-placement': 0,
    'import/extensions': [
      'error',
      { ignorePackages: true, ts: 'never', tsx: 'never' },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'gatsby-node.js',
          'rss-config.js',
          'jest/**/*',
          '**/__tests__/*.*',
          '**/*.test.*',
          '**/*.config.*',
        ],
      },
    ],
    'import/prefer-default-export': 0,
    'react/forbid-prop-types': 0,
    'react/sort-comp': [
      2,
      {
        order: [
          'static-variables',
          'static-methods',
          'lifecycle',
          'everything-else',
          'rendering',
        ],
        groups: {
          rendering: ['/^render.+$/', 'render'],
        },
      },
    ],
    'simple-import-sort/sort': [
      'error',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Packages. `react` and `gatsby` related packages come first.
          ['^react', '^gatsby', '^@?\\w'],
          ['^types(/.*|$)'],
          // src folders
          [`^(${fs.readdirSync('src').join('|')})(/.*|$)`],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.s?css$'],
        ],
      },
    ],

    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: true, argsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      { allowTypedFunctionExpressions: true },
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      'warn',
      { accessibility: 'no-public' },
    ],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      rules: {
        'import/extensions': 'off',
        'import/named': 'off',
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: ['./src', '.'],
        extensions: ['.js', '.ts', '.tsx'],
      },
    },
  },
}
