import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin' // Добавляем плагин
import prettierConfig from 'eslint-config-prettier'
import pluginPrettier from 'eslint-plugin-prettier'

// Правила форматирования из первого конфига
const formattingRules = {
  // Общие правила
  curly: 'error',
  '@stylistic/array-bracket-spacing': ['error', 'never'],
  '@stylistic/lines-between-class-members': ['error', 'always'],
  '@stylistic/no-multi-spaces': 'error',
  '@stylistic/no-tabs': 'error',
  '@stylistic/no-trailing-spaces': 'error',
  '@stylistic/no-whitespace-before-property': 'error',
  '@stylistic/nonblock-statement-body-position': ['error', 'beside'],
  '@stylistic/object-curly-spacing': ['error', 'always'],
  '@stylistic/semi': 'error',
  '@stylistic/semi-spacing': 'error',
  '@stylistic/semi-style': ['error', 'last'],
  '@stylistic/space-before-blocks': 'error',
  '@stylistic/padding-line-between-statements': [
    'error',
    { blankLine: 'always', prev: ['const', 'let'], next: '*' },
    { blankLine: 'always', prev: '*', next: ['const', 'let'] },
    { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let'] },
    { blankLine: 'always', prev: '*', next: 'block' },
    { blankLine: 'always', prev: '*', next: 'block-like' },
    { blankLine: 'always', prev: '*', next: 'class' },
    { blankLine: 'any', prev: 'case', next: 'case' },
    { blankLine: 'always', prev: '*', next: 'for' },
    { blankLine: 'always', prev: '*', next: 'do' },
    { blankLine: 'always', prev: '*', next: 'function' },
    { blankLine: 'always', prev: '*', next: 'if' },
    { blankLine: 'always', prev: '*', next: 'iife' },
    { blankLine: 'always', prev: '*', next: 'switch' },
    { blankLine: 'always', prev: '*', next: 'try' },
    { blankLine: 'always', prev: '*', next: 'while' },
    { blankLine: 'always', prev: 'block', next: '*' },
    { blankLine: 'always', prev: 'block-like', next: '*' },
    { blankLine: 'always', prev: 'class', next: '*' },
    { blankLine: 'any', prev: 'case', next: 'case' },
    { blankLine: 'always', prev: 'for', next: '*' },
    { blankLine: 'always', prev: 'do', next: '*' },
    { blankLine: 'always', prev: 'function', next: '*' },
    { blankLine: 'always', prev: 'if', next: '*' },
    { blankLine: 'always', prev: 'iife', next: '*' },
    { blankLine: 'always', prev: 'switch', next: '*' },
    { blankLine: 'always', prev: 'try', next: '*' },
    { blankLine: 'always', prev: 'while', next: '*' },
    { blankLine: 'always', prev: '*', next: 'return' }
  ],

  // Правило для Prettier
  'prettier/prettier': ['error', { endOfLine: 'auto' }],
};

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettierConfig // Отключает конфликтующие правила
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic': stylistic, // Регистрируем плагин
      prettier: pluginPrettier // Интеграция Prettier
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      ...formattingRules // Добавляем правила форматирования
    },
  }
);