module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2017,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    quotes: ["error", "double"],
    "max-len": ["error", { code: 400 }],
  },
};
