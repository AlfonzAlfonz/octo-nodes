import { stringType } from "../args";
import { nodeDeclaration } from "../nodeDeclaration";

export const Input = nodeDeclaration({
  id: "input",
  name: "Input",
  args: [
    { type: stringType, name: "Value" }
  ],
  returns: [
    { type: stringType, name: "Output" }
  ],
  render: ([value], { renderArg }) => {
    return renderArg(value) ?? "";
  }
});
