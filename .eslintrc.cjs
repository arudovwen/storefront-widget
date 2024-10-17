module.exports = {
  root: true,
  env: {
    node: true,
    "vue/setup-compiler-macros": true, // Add this line
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto", // You can set this to 'lf' or 'crlf' as needed
      },
    ],
    "vue/multi-word-component-names": "off", // Disable multi-word component names rule
  },
};
