import { nodeDeclaration } from "../../model";
import { renderableType } from "../argTypes";

export const Combine = nodeDeclaration({
  id: "combine",
  name: "Combine",
  args: [{ type: renderableType, name: "A" }, { type: renderableType, name: "B" }],
  returns: [
    { type: renderableType, name: "Output" }
  ],
  render: ([a, b]) => {
    return (
      <>
        {a}
        {b}
      </>
    );
  }
});
