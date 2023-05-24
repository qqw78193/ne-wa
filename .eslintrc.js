module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [ 'react-app', 'eslint:recommended', 'standard' ],
  parser: '@typescript-eslint/parser',
  plugins: [ 'react', '@typescript-eslint' ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-shadow': 'warn',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [ 'warn' ],
    'import/no-anonymous-default-export': 0,
    indent: [ 'error', 2 ],
    'no-unused-vars': 1,
    'linebreak-style': 0,
    quotes: [ 'error', 'single', 'avoid-escape' ],
    semi: [ 'error', 'never' ],
    'prefer-const': [ 'error' ],
    'no-console': 0,
    'no-labels': 0,
    'no-debugger': 0,
    'object-curly-spacing': [ 'error', 'always' ],
    'array-bracket-spacing': [ 'error', 'always' ],
    camelcase: 0
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [ '.js', '.ts', '.tsx' ]
      }
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
        classes: true
      }
    },
    react: {
      pragma: 'React',
      version: '18.2.0'
    }
  }
}
