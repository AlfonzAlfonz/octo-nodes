import { renderableType } from "../args";
import { nodeDeclaration } from "../nodeDeclaration";

export const Output = nodeDeclaration({
  id: "output",
  name: "Output",
  args: [
    { type: renderableType, name: "Result" }
  ],
  returns: [
    { type: renderableType, name: "Output" }
  ],
  render: ([result], { renderArg }) => {
    return (
      <svg>{renderArg(result)}</svg>
    );
  }
});
