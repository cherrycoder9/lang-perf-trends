import globals from "globals";

export default [
    {
        files: ["**/*.{js,mjs,cjs}"],
        languageOptions: {
            ecmaVersion: 2023,
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },
        rules: {
            "no-undef": "error",
            "no-var": "error",
            "prefer-const": "error"
        }
    }
];
