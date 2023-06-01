module.exports = {
  env: {
    'browser': true,
    'es2021': true,
    'amd': true,
    'node': true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:unicorn/recommended"
    // 'plugin:astro/recommended',
    // 'plugin:import/recommended'
  ],
  plugins: [
    'react',
    '@typescript-eslint',
    'simple-import-sort'
  ],
  settings: {
    // 'import/resolver': {
    //   'node': true,
    //   'typescript': true
    // }
  },
  overrides: [
    {
      // Define the configuration for `.astro` file.
      files: ['*.astro'],
      // Allows Astro components to be parsed.
      parser: 'astro-eslint-parser',
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {
        'react/jsx-key': 'off',
        // override/add rules settings here, such as:
        // 'astro/no-set-html-directive': 'error'

      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  rules: {
    indent: [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'never'
    ],
    'object-property-newline': ['error', { 'allowAllPropertiesOnSameLine': true }],
    'object-curly-spacing': ['error', 'always'],
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'react/react-in-jsx-scope': 'off',
    'react/no-unknown-property': 'off',
    'no-multiple-empty-lines': 'error',
    '@typescript-eslint/no-empty-interface': 'off',
    'simple-import-sort/exports': 'error',
    'quote-props': ['error', 'as-needed'],
    'react/jsx-max-props-per-line': [1, { 'maximum': { 'single': 3, 'multi': 1 } }],
    'react/jsx-first-prop-new-line': [1, 'multiline'],
    'react/jsx-closing-bracket-location': 1,
    'react/jsx-wrap-multilines': 1,
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_', args: 'after-used' }],
    'unicorn/filename-case': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/prefer-spread': 'off',
    // 'unicorn/template-indent': ['error', { 'indent': 2 }],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^react', '^@?\\w'],
          ['^@mui'],
          ['^@/services'],
          ['^@/ui'],
          ['^@/components'],
        ]
      }
    ]
  }
}
