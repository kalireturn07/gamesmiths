import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default [
  { ignores: ['dist', 'dist-ssr'] },
  js.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  reactHooks.configs.flat.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { 'react-refresh': reactRefresh },
    rules: {
      // Core ESLint can't see JSX usage, so allow unused-looking Capitalized names
      // (and `motion`, used as <motion.div>).
      'no-unused-vars': ['error', { varsIgnorePattern: '^(?:[A-Z_]|motion$)', argsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  {
    files: ['scripts/**', '*.config.js'],
    languageOptions: { globals: globals.node },
  },
]
