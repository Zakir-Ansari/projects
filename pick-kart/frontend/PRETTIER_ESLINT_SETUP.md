# Pick-Kart Frontend Setup Guide

## ✅ Project Structure
```
D:\Coding\VsCode\Git_Repositories\projects\pick-kart\frontend
```

> Make sure you run all npm commands inside `pick-kart/frontend`.

---

## ✅ Prettier Setup

### 1. Install Prettier (already present in `devDependencies`)
```
npm install --save-dev prettier
```

### 2. Prettier Config (`.prettierrc`)
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

### 3. Prettier Commands
```json
"scripts": {
  "format": "prettier --check \"src/**/*.{ts,js,html,scss}\"",
  "format:fix": "prettier --write \"src/**/*.{ts,js,html,scss}\""
}
```

---

## ✅ ESLint Setup

### 1. Install ESLint & Angular ESLint (already present)
```
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin angular-eslint eslint-plugin-prettier
```

### 2. ESLint Config (`eslint.config.js`)
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
      'prettier/prettier': 'error',
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

### 3. ESLint Commands
```json
"scripts": {
  "lint": "ng lint",
  "lint:fix": "ng lint --fix"
}
```

---

## ✅ Husky Setup (Git Hooks)

### 1. Install Husky
> Run this from `pick-kart/frontend`:
```
npm install husky --save-dev
```

### 2. Add prepare script in `package.json`
```json
"scripts": {
  "prepare": "husky"
}
```

### 3. Initialize Husky
> Run this from `pick-kart/frontend`:
```
npx husky install
```

### 4. Add Pre-commit Hook
> Run this from `pick-kart/frontend`:
```
npx husky add .husky/pre-commit "cd pick-kart/frontend && npm run lint:fix && npm run format:fix"
```

### ✅ Your `.husky/pre-commit` file should look like this:
```bash
#!/bin/sh

set -e  # Stop on first error

CHANGED_FILES=$(git diff --cached --name-only)

if echo "$CHANGED_FILES" | grep -q "pick-kart/frontend"; then
  echo "⚡ Running frontend lint & format..."
  cd pick-kart/frontend
  if npm run format:fix && npm run lint; then
    echo "✅ Frontend checks passed!"
  else
    echo "❌ Frontend lint or format failed. Commit aborted."
    exit 1
  fi
fi

if echo "$CHANGED_FILES" | grep -q "pick-kart/backend"; then
  echo "⚡ Running backend lint & format..."
  echo "⚠️  No backend scripts configured yet."
fi

echo "🎉 All pre-commit checks completed successfully! You're good to go! 🚀"
```

---

## ✅ Final checklist
- Make sure your `.git` folder is at `D:\Coding\VsCode\Git_Repositories\projects`.
- Run `npm install` in `pick-kart/frontend`.
- Husky will auto-install hooks thanks to the `prepare` script.
- Pre-commit will now run lint fixes and format fixes automatically.

---

## 🎉 You're all set! Happy coding! 🎯