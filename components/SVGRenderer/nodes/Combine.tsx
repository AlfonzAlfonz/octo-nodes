import { renderableType, stringType } from "../args";
import { nodeDeclaration } from "../nodeDeclaration";

export const Combine = nodeDeclaration({
  id: "combine",
  name: "Combine",
  args: [{ type: renderableType, name: "A" }, { type: renderableType, name: "B" }],
  returns: [
    { type: renderableType, name: "Output" }
  ],
  render: ([a, b], { renderArg }) => {
    return (
      <>
        {renderArg(a)}
        {renderArg(b)}
      </>
    );
  }
});
