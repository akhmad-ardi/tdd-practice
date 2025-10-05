const createServer = require("./createServer");
const FigureCalculator = require("./FigureCalculator");
const MathBasic = require("./MathBasic");

describe("A HTTP Server", () => {
  describe("when GET /add", () => {
    it("should respond with a status code of 200 and the payload value is addition result of a and b correctly", async () => {
      // Arrange
      const a = 10;
      const b = 20;
      const spyAdd = jest.spyOn(MathBasic, "add");
      const server = createServer({ mathBasic: MathBasic });

      // Action
      const response = await server.inject({
        method: "GET",
        url: `/add/${a}/${b}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(30);
      expect(spyAdd).toHaveBeenCalledWith(a, b);
    });
  });

  describe("when GET /subtract", () => {
    it("should respond with a status code of 200 and the payload value is subtraction result of a and b correctly", async () => {
      // Arrange
      const a = 12;
      const b = 8;
      const spySubtract = jest.spyOn(MathBasic, "subtract");
      const server = createServer({ mathBasic: MathBasic });

      // Action
      const response = await server.inject({
        method: "GET",
        url: `/subtract/${a}/${b}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(4); // a - b
      expect(spySubtract).toHaveBeenCalledWith(a, b);
    });
  });

  describe("when GET /multiply", () => {
    it("should respond with a status code of 200 and the payload value is multiplication result of a and b correctly", async () => {
      // Arrange
      const a = 4;
      const b = 4;
      const spyMultiply = jest.spyOn(MathBasic, "multiply");
      const server = createServer({ mathBasic: MathBasic });

      // Action
      const response = await server.inject({
        method: "GET",
        url: `/multiply/${a}/${b}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(16); // a * b
      expect(spyMultiply).toHaveBeenCalledWith(a, b);
    });
  });

  describe("when GET /divide", () => {
    it("should respond with a status code of 200 and the payload value is dividation result of a and b correctly", async () => {
      // Arrange
      const a = 10;
      const b = 2;
      const spyDivide = jest.spyOn(MathBasic, "divide");
      const server = createServer({ mathBasic: MathBasic });

      // Action
      const response = await server.inject({
        method: "GET",
        url: `/divide/${a}/${b}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(5); // a / b
      expect(spyDivide).toHaveBeenCalledWith(a, b);
    });
  });

  describe("when GET /rectangle/perimeter", () => {
    it("must produce a response code of 200 and return the payload value of the calculation result of the perimeter of squares a and b correctly.", async () => {
      // Arrange
      const length = 10;
      const width = 2;
      const figureCalculator = new FigureCalculator(MathBasic);
      const spyAdd = jest.spyOn(MathBasic, "add");
      const spyMultiply = jest.spyOn(MathBasic, "multiply");
      const server = createServer({ mathBasic: MathBasic, figureCalculator });

      // Action
      const response = await server.inject({
        method: "GET",
        url: `/rectangle/perimeter/${length}/${width}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(24); // 2 (length + width)
      expect(spyAdd).toHaveBeenCalledWith(length, width);
      expect(spyMultiply).toHaveBeenCalledWith(2, 12);
    });
  });

  describe("when GET /rectangle/area", () => {
    it("must produce a response code of 200 and return the payload value of the calculation result of the area of squares a and b correctly.", async () => {
      // Arrange
      const length = 10;
      const width = 2;
      const figureCalculator = new FigureCalculator(MathBasic);
      const spyMultiply = jest.spyOn(MathBasic, "multiply");
      const server = createServer({ mathBasic: MathBasic, figureCalculator });

      // Action
      const response = await server.inject({
        method: "GET",
        url: `/rectangle/area/${length}/${width}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(20); // length * width
      expect(spyMultiply).toHaveBeenCalledWith(length, width);
    });
  });

  describe("when GET /triangle/parimeter", () => {
    it("must produce a response code of 200 and return the payload value of the calculation result of the parimeter of triangle a and b correctly.", async () => {
      // Arrange
      const sideA = 20;
      const sideB = 5;
      const base = 5;
      const figureCalculator = new FigureCalculator(MathBasic);
      const spyAdd = jest.spyOn(MathBasic, "add");
      const server = createServer({ mathBasic: MathBasic, figureCalculator });

      // Action
      const response = await server.inject({
        method: "GET",
        url: `/triangle/parimeter/${sideA}/${sideB}/${base}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(30); // (sideA + sideB) + base
      expect(spyAdd).toHaveBeenCalledWith(25, 5);
    });
  });

  describe("when GET /triangle/area", () => {
    it("must produce a response code of 200 and return the payload value of the calculation result of the area of triangle a and b correctly.", async () => {
      // Arrange
      const base = 20;
      const height = 5;
      const figureCalculator = new FigureCalculator(MathBasic);
      const spyMultiply = jest.spyOn(MathBasic, "multiply");
      const spyDivide = jest.spyOn(MathBasic, "divide");
      const server = createServer({ mathBasic: MathBasic, figureCalculator });

      // Action
      const response = await server.inject({
        method: "GET",
        url: `/triangle/area/${base}/${height}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(50); // (base * height) / 2
      expect(spyMultiply).toHaveBeenCalledWith(base, height);
      expect(spyDivide).toHaveBeenCalledWith(100, 2);
    });
  });
});
