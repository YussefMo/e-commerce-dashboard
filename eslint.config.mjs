import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettierPlugin from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals'),
  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': [
        'error',
        { vars: 'all', args: 'after-used', ignoreRestSiblings: false }
      ]
    }
  }
];

export default eslintConfig;


// npm install --save-dev prettier-plugin-tailwindcss
// npm install --save-dev eslint-plugin-prettier prettier
// npm install --save-dev eslint eslint-config-next @eslint/eslintrc
// npm install --save-dev eslint eslint-config-next eslint-plugin-prettier eslint-config-prettier
// npm install --save-dev eslint-config-prettier
// npm install --save-dev prettier
