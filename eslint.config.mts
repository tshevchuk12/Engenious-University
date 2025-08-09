import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import playwright from "eslint-plugin-playwright";
import prettier from "eslint-config-prettier";

export default [
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "playwright-report/**",
      "allure-report/**",
      "**/trace/**",
      "*.min.js",
      "test-results/**",
      "html-report/**",
      "allure-results/**",
      "screenshots/**",
    ],
  },

  {
    files: [
      "src/**/*.{ts,tsx,js,mjs,cjs}",
      "tests/**/*.{ts,tsx,js}",
      "e2e/**/*.{ts,tsx,js}",
      "Tests/**/*.{ts,tsx,js}", 
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      
      globals: { ...globals.node, ...globals.browser },
    },
  },


  js.configs.recommended,
  ...tseslint.configs.recommended,


  playwright.configs["flat/recommended"],
  {
    files: [
      "**/*.spec.{ts,js,tsx}",
      "tests/**/*.{ts,js,tsx}",
      "e2e/**/*.{ts,js,tsx}",
      "Tests/**/*.{ts,js,tsx}",
    ],
    rules: {
      "playwright/no-focused-test": "error",
      "playwright/no-skipped-test": "warn",
      "playwright/valid-title": "off",
      
    },
  },

  prettier,
];