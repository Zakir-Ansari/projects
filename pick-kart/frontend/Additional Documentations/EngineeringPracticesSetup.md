# Pick-Kart Frontend Engineering Practices Setup Guide

## ✅ Prettier Setup

### 1. Install Prettier
```bash
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

### 1. Install ESLint & Angular ESLint
```bash
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

## ✅ Jest Setup (as per [this article](https://medium.com/@zeeshankhan8838/unit-testing-angular-with-jest-configuration-e324ec61620c))

### 1. Uninstall Jasmine/Karma
```
npm uninstall @types/jasmine jasmine-core karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter
```

### 2. Remove the `test` object from `angular.json`

### 3. Install Jest
```
npm install --save-dev @types/jest jest jest-preset-angular
```

### 4. Create `setup.jest.ts` in `src/`
```ts
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
setupZoneTestEnv();
```

### 5. Update `tsconfig.spec.json`
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": ["jest", "node"]
  },
  "files": ["src/setup.jest.ts"],
  "include": ["src/**/*.spec.ts", "src/**/*.d.ts"]
}
```

### 6. Add Jest configuration to `package.json`
```json
"scripts": {
  "ng": "ng",
  "start": "ng serve",
  "build": "ng build",
  "watch": "ng build --watch --configuration development",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage",
  "format": "prettier --check \"src/**/*.{ts,js,html,scss}\"",
  "format:fix": "prettier --write \"src/**/*.{ts,js,html,scss}\"",
  "lint": "eslint \"src/**/*.{ts,js}\"",
  "lint:fix": "eslint \"src/**/*.{ts,js}\" --fix",
  "prepare": "husky install"
},
"jest": {
  "preset": "jest-preset-angular",
  "setupFilesAfterEnv": ["<rootDir>/src/setup.jest.ts"],
  "testPathIgnorePatterns": ["<rootDir>/node_modules/", "<rootDir>/dist/"],
  "globals": {
    "ts-jest": {
      "tsConfig": "<rootDir>/tsconfig.spec.json",
      "stringifyContentPathRegex": "\\.html$"
    }
  }
}
```

### 7. Run Tests
```
npm run test
```

---

## ✅ Husky and Lint-Staged Setup

### 1. Install Husky and Lint-Staged
```
npm install husky lint-staged --save-dev
```

### 2. Add prepare script in `package.json`
```json
"scripts": {
  "prepare": "husky install"
}
```

### 3. Initialize Husky
```
npx husky install
```

### 4. Update `lint-staged` in `package.json`
```json
"lint-staged": {
  "*.{ts,js}": [
    "npm run format:fix",
    "npm run lint",
    "npm run test"
  ],
  "*.{html,css,scss}": [
    "npm run format:fix"
  ]
}
```

### 5. Add Pre-commit Hook
> Add the following in `.husky/pre-commit`:
```bash
#!/bin/sh

set -e  # Stop on first error

CHANGED_FILES=$(git diff --cached --name-only)

if echo "$CHANGED_FILES" | grep -q "pick-kart/frontend"; then
  echo "⚡ Running frontend lint, format & test..."
  cd pick-kart/frontend
  if npx lint-staged; then
    echo "✅ Frontend checks passed!"
  else
    echo "❌ Frontend lint-staged failed. Commit aborted."
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
- Husky hooks will auto-install thanks to the `prepare` script.
- Pre-commit will now run lint fixes, format fixes, and unit tests automatically.
