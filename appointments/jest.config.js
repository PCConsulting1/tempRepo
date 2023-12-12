const jestConfig = {
  verbose: true,
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  testMatch: ["/tests/*.js"],
};

module.exports = jestConfig;
