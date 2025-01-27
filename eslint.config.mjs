import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

import globals from "globals";
import jsdoc from "eslint-plugin-jsdoc";
import prettierConfig from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  prettierConfig,
  eslintPluginPrettierRecommended,
  jsdoc.configs["flat/recommended-typescript"],
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "prettier/prettier": "error",
      "no-console": "warn",
      "no-constructor-return": "error",
      "no-duplicate-imports": ["error", { includeExports: true }],
      "class-methods-use-this": "error",
      "default-case-last": "error",
      "eol-last": ["error", "always"],
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: "block-like",
          next: "*",
        },
        {
          blankLine: "always",
          prev: ["case", "default"],
          next: "*",
        },
      ],
      "no-multiple-empty-lines": [
        "error",
        {
          max: 1,
          maxBOF: 0,
          maxEOF: 1,
        },
      ],
      "no-useless-assignment": "error",
      "no-unused-vars": "error",
      eqeqeq: "error",
      "no-useless-return": "error",
      "prefer-const": "error",
    },
  },
];

export default eslintConfig;
