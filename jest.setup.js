module.exports = {
  coverageProvider: "v8",
  moduleNameMapper: {
    // stub out CSS imports per Jest's recommendation
    "\\.(css)$": "identity-obj-proxy",
  },
};
