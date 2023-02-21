import { nodeDeclaration } from "../../model";
import { stringType } from "../argTypes";

export const Input = nodeDeclaration({
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
