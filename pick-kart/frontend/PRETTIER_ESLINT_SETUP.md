## ✅ Prettier & ESLint Setup — `pick-kart` Project

This guide explains how to set up and use **Prettier** and **ESLint** in your Angular project for consistent code formatting and linting.

---

### 📁 Project Structure (relevant files)
```
pick-kart/
├── package.json
├── .prettierrc
├── eslint.config.js
└── src/
```

---

## ⚙️ Prettier Setup

### ➡️ Install Prettier (already present)
```bash
npm install --save-dev prettier
```

### ➡️ Prettier Configuration (`.prettierrc`)
```json
{
  "tabWidth": 2,
  "useTabs": false,
  "singleQuote": true,
  "semi": true,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "trailingComma": "es5",
  "bracketSameLine": true,
  "printWidth": 120,
  "endOfLine": "auto"
}
```

### ➡️ Prettier Scripts in `package.json`
```json
"scripts": {
  "format": "prettier --check \"src/**/*.{ts,js,html,scss}\"",
  "format:fix": "prettier --write \"src/**/*.{ts,js,html,scss}\""
}
```

### ✅ Usage:
- To check formatting:
```bash
npm run format
```
- To auto-fix formatting issues:
```bash
npm run format:fix
```

---

## ⚙️ ESLint Setup

### ➡️ Install ESLint and plugins (already present)
```bash
npm install --save-dev eslint @eslint/js typescript-eslint angular-eslint eslint-plugin-prettier
```

### ➡️ ESLint Configuration (`eslint.config.js`)
```js
// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      'prettier/prettier': 'error', // ✅ integrate prettier checks into lint
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {},
  }
);
```

### ➡️ ESLint Scripts in `package.json`
```json
"scripts": {
  "lint": "ng lint",
  "lint:fix": "ng lint --fix"
}
```

### ✅ Usage:
- To check for lint issues:
```bash
npm run lint
```
- To automatically fix lint errors:
```bash
npm run lint:fix
```

---

## 🎯 Recommended Workflow:
Before pushing your code:
```bash
npm run format:fix && npm run lint:fix && npm test
```
✅ This ensures your code is clean, consistent, and error-free.

---

## 🚀 VSCode Recommended Extensions:
- **Prettier — Code Formatter**  
- **ESLint**

### Enable format on save:
Go to **Settings → Text Editor → Formatting → Format On Save** and enable it.

---

> ⭐ *If you'd like, I can also help you set up pre-commit hooks with `husky` and `lint-staged` to enforce these checks automatically!*

Let me know if you'd like that! 😎