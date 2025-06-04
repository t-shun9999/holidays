import jest from "eslint-plugin-jest";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:jest/recommended",
    // "prettier",
    "eslint-config-prettier",
), {
    plugins: {
        jest,
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...Object.fromEntries(Object.entries(globals.browser).map(([key]) => [key, "off"])),
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "module",

        parserOptions: {
            project: "./tsconfig.eslint.json",
        },
    },

    settings: {
        "import/extensions": [".js", ".jsx", ".json", ".ts", ".tsx"],

        "import/resolver": {
            webpack: {
                config: "webpack.config.js",
            },
        },
    },

    rules: {
        // "import/extensions": ["error", "ignorePackages", {
        //     js: "never",
        //     jsx: "never",
        //     ts: "never",
        //     tsx: "never",
        // }],

        "no-useless-constructor": "off",
        "@typescript-eslint/no-useless-constructor": ["error"],
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/explicit-member-accessibility": "error",
        "@typescript-eslint/consistent-type-assertions": "error",
        "@typescript-eslint/no-unsafe-call": "error",
        "@typescript-eslint/no-unsafe-return": "error",
        "no-magic-numbers": "off",

        "@typescript-eslint/no-magic-numbers": ["warn", {
            ignoreEnums: true,
            ignoreReadonlyClassProperties: true,
        }],

        "@typescript-eslint/array-type": ["error", {
            default: "array-simple",
        }],

        "@typescript-eslint/no-explicit-any": ["error", {
            ignoreRestArgs: true,
        }],

        "@typescript-eslint/no-misused-new": "error",
        // "comma-spacing": "off",
        // "@typescript-eslint/comma-spacing": ["warn", {}],
        // "func-call-spacing": "off",
        // "@typescript-eslint/func-call-spacing": ["error"],
        // indent: "off",
        // "@typescript-eslint/indent": ["error", {}],
    },
}];
