/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting"
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/no-unused-vars": "error",
    "vue/component-name-in-template-casing": [
      "error",
      "kebab-case",
      {
        registeredComponentsOnly: true
      }
    ],
    "vue/require-default-prop": "off",
    "vue/no-console": "off",
    "vue/html-quotes": ["error", "double"],
    semi: ["error", "never"],
    "vue/require-explicit-emits": "error",
    "vue/no-spaces-around-equal-signs-in-attribute": ["error"],
    "vue/comma-dangle": "off",
    "vue/prop-name-casing": ["error", "camelCase"],
    "vue/require-prop-types": ["error"],
    "vue/component-tags-order": [
      "error",
      {
        order: [["template", "script", "style"]]
      }
    ]
  }
}
