function validation(args) {
  if (args.length !== 2) {
    throw new Error("fungsi harus menerima dua parameter");
  }

  const [a, b] = args;

  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("fungsi hanya menerima parameter number");
  }

  return [a, b];
}

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
