const { validation } = require("./utils");

const MatchBasic = {
  add(...args) {
    const [a, b] = validation(args);

    return a + b;
  },
  subtract(...args) {
    const [a, b] = validation(args);

    return a - b;
  },
  multiply(...args) {
    const [a, b] = validation(args);

    return a * b;
  },
  divide(...args) {
    const [a, b] = validation(args);

    return a / b;
  },
};

module.exports = MatchBasic;
