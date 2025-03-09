import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended, // Use ESLint recommended rules
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module', // Use ESM
      globals: globals.node, // Enable Node.js globals (e.g., __dirname, process)
    },
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error', // Enforce Prettier formatting
      'no-console': 'warn', // Warn if console logs are used
      'no-unused-vars': 'warn', // Warn about unused variables
      eqeqeq: ['error', 'always'], // Enforce === instead of ==
      camelcase: 'warn', // Warn if variable names are not in camelCase
      strict: ['error', 'global'], // Require 'use strict' globally
      'no-undef': 'error', // Prevent using undefined variables
    },
  },
  prettier, // Disable ESLint rules that conflict with Prettier
];
