import { anyType } from "../argTypes";
import { nodeType } from "../lib";

export const Input = nodeType({
  id: "input",
  name: "Input",
  generics: [anyType],
  args: t => [
    { type: t, name: "Input" }
  ],
  returns: t => [
    { type: t, name: "Output" }
  ],
  render: ([input]) => input
});
