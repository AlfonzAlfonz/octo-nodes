import { stringType } from "../argTypes";
import { nodeType } from "../lib/nodeType";

export const Input = nodeType({
  id: "input",
  name: "Input",
  args: [
    { type: stringType, name: "Input" }
  ],
  returns: [
    { type: stringType, name: "Output" }
  ],
  render: ([input]) => input
});
