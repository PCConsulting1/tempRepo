import { matcherHint, printExpected, printReceived } from "jest-matcher-utils";

export const toBeInputFieldOfType = (received, expectedType) => {
  const pass =
    received &&
    received.tagName.toLowerCase() === "input" &&
    received.type === expectedType;

  const sourceHint = () =>
    matcherHint(
      "toBeInputFieldOfType",
      "element",
      printExpected(expectedType),
      {
        isNot: pass,
      }
    );

  const actualHint = () => {
    if (!received) {
      return "Actual: element was not found";
    }
    if (received.tagName.toLowerCase() !== "input") {
      return `Actual: <${received.tagName.toLowerCase()}>`;
    }
    return `Actual: <input type="${received.type}">`;
  };

  const message = () => [sourceHint(), actualHint()].join("\n\n");

  return { pass, message };
};
