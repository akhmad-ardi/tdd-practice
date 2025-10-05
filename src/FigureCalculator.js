const { validation } = require("./utils");

class FigureCalculator {
  constructor(mathBasic) {
    this._mathBasic = mathBasic;
  }

  calculateRectanglePerimeter(...args) {
    const [length, width] = validation(args);

    return this._mathBasic.multiply(2, this._mathBasic.add(length, width));
  }

  calculateRectangleArea(...args) {
    const [length, width] = validation(args);

    return this._mathBasic.multiply(length, width);
  }

  calculateTrianglePerimeter(...args) {
    if (args.length !== 3) {
      throw new Error("fungsi harus menerima tiga parameter");
    }

    const [sideA, sideB, base] = args;

    if (
      typeof sideA !== "number" ||
      typeof sideB !== "number" ||
      typeof base !== "number"
    ) {
      throw new Error("fungsi hanya menerima parameter number");
    }

    return this._mathBasic.add(this._mathBasic.add(sideA, sideB), base);
  }

  calculateTriangleArea(...args) {
    const [base, height] = validation(args);

    return this._mathBasic.divide(this._mathBasic.multiply(base, height), 2);
  }
}

module.exports = FigureCalculator;
