const fs = require('fs')

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
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
    'plugin:react/recommended',
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
    'no-console': 'off',
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    'object-curly-newline': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-danger': 'off',
    'react/prefer-stateless-function': 'off',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
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
    'import/prefer-default-export': 'off',
    'react/forbid-prop-types': 'off',
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
