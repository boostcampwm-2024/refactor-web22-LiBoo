import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config({ ignores: ['dist'] }, js.configs.recommended, ...tseslint.configs.recommended, {
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: {
      ...globals.browser
    },
    parser: tseslint.parser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    }
  },
  plugins: {
    '@typescript-eslint': tseslint.plugin,
    react: reactRecommended.plugins.react,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh
  },
  rules: {
    ...reactRecommended.rules,
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      {
        allowConstantExport: true
      }
    ],
    eqeqeq: ['error', 'always'],
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    '@typescript-eslint/no-unused-vars': ['error']
  },
  settings: {
    ...reactRecommended.settings
  }
});