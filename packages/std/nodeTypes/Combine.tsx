import { renderableType } from "../argTypes";
import { nodeType } from "../lib";

export const Combine = nodeType({
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
