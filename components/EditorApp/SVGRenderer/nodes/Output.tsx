import { renderableType } from "../argTypes";
import { nodeDeclaration } from "../../model";

export const Output = nodeDeclaration({
  id: "output",
  name: "Output",
  args: [
    { type: renderableType, name: "Result" }
  ],
  returns: [
    { type: renderableType, name: "Output" }
  ],
  render: ([result]) => {
    return (
      <svg>{result}</svg>
    );
  }
});
