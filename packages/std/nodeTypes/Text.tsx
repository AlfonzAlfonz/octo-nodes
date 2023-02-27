import { renderableType } from "../argTypes";
import { nodeType } from "../lib/nodeType";

export const Text = nodeType({
  id: "text",
  name: "Text",
  args: [{ type: renderableType, name: "Text" }],
  returns: [
    { type: renderableType, name: "Output" }
  ],
  render: ([children]) => {
    return <text>{children}</text>;
  }
});
