// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

export default [
{
ignores: ['dist', 'node_modules', 'coverage'],
},
{
files: ['**/*.ts'],
languageOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    parser: tsParser,
    globals: globals.node,
},
plugins: {
    '@typescript-eslint': tseslint,
},
rules: {
    ...js.configs.recommended.rules,
    ...tseslint.configs.recommended.rules,

    // backend-friendly rules
    'no-console': 'off',
    '@typescript-eslint/no-unused-vars': [
    'warn',
    { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
},
},
]
